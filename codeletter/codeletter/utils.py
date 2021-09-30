import requests
from bs4 import BeautifulSoup
import random
import re
from codeletter.models import Concept, Article


def insert_article(data_json):
    """
    Given json, it gets the concept ids and insert the article into article database.

    :param data_json: json containing article information is given as input
    :type data_json: dict
    """
    concept_ids = get_or_insert_concept(data_json["concepts"])
    article_rec = Article(
        url=data_json["url"],
        title=data_json["title"],
        abstract=data_json["abstract"],
        domain=data_json["domain"],
        concept_ids=concept_ids,
    )
    article_rec.save()


def get_or_insert_concept(concepts):
    """
    Given a list of concepts names, it gets the concept ids.

    :param concepts: list of concept names
    :type concepts: list
    :return: comma separated value of all concept ids
    :rtype: string
    """
    concept_ids = []
    for concept in concepts:
        concept_rec = Concept.objects.filter(concept_name=concept)
        if concept_rec:
            concept_ids.append(concept_rec[0].concept_id)
        else:
            Concept.objects.create(concept_name=concept)
            concept_saved_rec = Concept.objects.filter(concept_name=concept)[0]
            print(concept_saved_rec.concept_name)
            concept_ids.append(concept_saved_rec.concept_id)
    return ",".join([str(i) for i in concept_ids])


def is_leap(year):
    """
    Takes year as input, and returns if its leap year or not.

    :param year: a calendar year
    :type year: int
    :return: true or false
    :rtype: boolean
    """
    if year % 4 != 0:
        return False
    elif year % 100 != 0:
        return True
    elif year % 400 != 0:
        return False
    else:
        return True


def convert_day(day, year):
    """
    Takes day and year as input, and returns date and month in that year.

    :param day: day of the month
    :type day: int
    :param year: a calendar year
    :type year: int
    :return: pair of month and date
    :rtype: pair(int,int)
    """
    month_days = [
        31,
        29 if is_leap(year) else 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
    ]
    m = 0
    d = 0
    while day > 0:
        d = day
        day -= month_days[m]
        m += 1
    return (m, d)


def get_tags_and_abstract(url):
    """
    Takes url as input, and returns tags and abstract for that article.

    :param url: url
    :type url: string
    :return: list of tags and abstract
    :rtype: list, string
    """
    response = requests.get(url, allow_redirects=True)
    if not response.url.startswith(url):
        print("redirected")
    else:
        page = response.text
        soup = BeautifulSoup(page, "html.parser")
        divs = soup.find("ul", {"class": "cj ck"})
        if divs == None:
            return 0, 0
        lis = divs.find_all("li")
        tags = []
        for li in lis:
            tags.append(li.text)

        h2s = soup.find_all("p")
        abstract = h2s[3].get_text()
    return tags, abstract


def get_scraped_content(year):
    """
    Takes year as the input, and insert data into the article table.

    :param: year
    :type: int
    """
    selected_days = random.sample(
        [i for i in range(1, 367 if is_leap(year) else 366)], 1
    )
    data = []
    article_id = 0
    i = 0
    n = len(selected_days)
    non_abstract_urls = []
    for d in selected_days:
        i += 1
        month, day = convert_day(d, year)
        date = "{0}-{1:02d}-{2:02d}".format(year, month, day)
        publication, url = (
            "Towards Data Science",
            "https://towardsdatascience.com/archive/{0}/{1:02d}/{2:02d}",
        )
        response = requests.get(url.format(year, month, day), allow_redirects=True)
        print(url.format(year, month, day))
        if not response.url.startswith(url.format(year, month, day)):
            continue
        page = response.content
        soup = BeautifulSoup(page, "html.parser")
        articles = soup.find_all(
            "div",
            class_="postArticle postArticle--short js-postArticle js-trackPostPresentation js-trackPostScrolls",
        )
        for article in articles:
            readmore_div = article.find("div", class_="postArticle-readMore")
            readmore_a = readmore_div.find("a")
            article_href = readmore_a["href"]
            print(article_href)
            article_response = requests.get(article_href, allow_redirects=True)
            article_page = article_response.text
            article_soup = BeautifulSoup(article_page, "html.parser")
            tags, abstract = get_tags_and_abstract(article_href)
            print(tags)
            if tags == 0:
                non_abstract_urls.append(article_href)
                continue
            title = article.find("h3", class_="graf--title")
            if title is None:
                continue
            title = title.contents[0]
            article_id += 1
            subtitle = article.find("h4", class_="graf--subtitle")
            subtitle = subtitle.contents[0] if subtitle is not None else ""
            article_url = article.find_all("a")[3]["href"].split("?")[0]
            reading_time = article.find("span", class_="readingTime")
            reading_time = (
                0 if reading_time is None else int(reading_time["title"].split(" ")[0])
            )
            responses = article.find_all("a")
            if len(responses) == 7:
                responses = responses[6].contents[0].split(" ")
                if len(responses) == 0:
                    responses = 0
                else:
                    responses = responses[0]
            else:
                responses = 0
            data_json = {}
            data_json["title"] = title
            data_json["abstract"] = abstract
            data_json["url"] = article_url
            data_json["domain"] = publication
            data_json["concepts"] = tags
            insert_article(data_json)
