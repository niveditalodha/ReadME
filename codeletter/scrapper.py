import requests
from bs4 import BeautifulSoup
import pandas as pd
import random
import re


def is_leap(year):
    if year % 4 != 0:
        return False
    elif year % 100 != 0:
        return True
    elif year % 400 != 0:
        return False
    else:
        return True
    
def convert_day(day, year):
    month_days = [31, 29 if is_leap(year) else 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    m = 0
    d = 0
    while day > 0:
        d = day
        day -= month_days[m]
        m += 1
    return (m, d)

def get_tags_and_abstract(url):
  response = requests.get(url, allow_redirects=True)
  if not response.url.startswith(url):
      print("redirected")
  else:
    page = response.text
    soup = BeautifulSoup(page, 'html.parser')
    divs=soup.find("ul", {"class": "cj ck"})
    if(divs==None):
      return 0,0
    lis=divs.find_all('li')
    tags=""
    for li in lis:
      tags=tags+","+li.text

    h2s=soup.find_all("p")
    abstract=h2s[3].get_text()
  return tags[1:],abstract

year=2020
selected_days = random.sample([i for i in range(1, 367 if is_leap(year) else 366)], 1)
data = []
article_id = 0
i = 0
n = len(selected_days)
non_abstract_urls=[]
for d in selected_days:
    i += 1
    month, day = convert_day(d, year)
    date = '{0}-{1:02d}-{2:02d}'.format(year, month, day)
    publication, url='Towards Data Science','https://towardsdatascience.com/archive/{0}/{1:02d}/{2:02d}'
    response = requests.get(url.format(year, month, day), allow_redirects=True)
    print(url.format(year, month, day))
    if not response.url.startswith(url.format(year, month, day)):
        continue
    page = response.content
    soup = BeautifulSoup(page, 'html.parser')
    articles = soup.find_all("div", class_="postArticle postArticle--short js-postArticle js-trackPostPresentation js-trackPostScrolls")
    for article in articles:
        readmore_div=article.find("div",class_="postArticle-readMore")
        readmore_a=readmore_div.find('a')
        article_href=readmore_a['href']
        print(article_href)
        article_response = requests.get(article_href, allow_redirects=True)
        article_page=article_response.text
        article_soup=BeautifulSoup(article_page, 'html.parser')
        tags,abstract=get_tags_and_abstract(article_href)
        if(tags==0):
            non_abstract_urls.append(article_href)
            continue
        title = article.find("h3", class_="graf--title")
        if title is None:
            continue
        title = title.contents[0]
        article_id += 1
        subtitle = article.find("h4", class_="graf--subtitle")
        subtitle = subtitle.contents[0] if subtitle is not None else ''
        #image = article.find("img", class_="graf-image")
        #image = '' if image is None else get_img(image['src'], 'images', f'{article_id}')
        article_url = article.find_all("a")[3]['href'].split('?')[0]
        reading_time = article.find("span", class_="readingTime")
        reading_time = 0 if reading_time is None else int(reading_time['title'].split(' ')[0])
        responses = article.find_all("a")
        if len(responses) == 7:
            responses = responses[6].contents[0].split(' ')
            if len(responses) == 0:
                responses = 0
            else:
                responses = responses[0]
        else:
            responses = 0

    data.append([article_id, article_url, title, subtitle,abstract, tags, responses, reading_time, publication, date])
    print(data[0])
    exit()