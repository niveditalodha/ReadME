import requests
from bs4 import BeautifulSoup
import pandas as pd
import random
import re
from codeletter.models import Concept, Article

def insert_article(data_json):
    concept_ids=get_or_insert_concept(data_json["concepts"])
    article_rec=Article(url=data_json["url"],title=data_json["title"],abstract=data_json["abstract"],domain=data_json["domain"],concept_ids=concept_ids)
    article_rec.save()

def get_or_insert_concept(concepts):
    concept_ids=[]
    for concept in concepts:
        concept_rec=Concept.objects.filter(concept_name=concept)
        if(concept_rec):
            concept_ids.append(concept_rec[0].concept_id)
        else:
            Concept.objects.create(concept_name=concept)
            concept_saved_rec=Concept.objects.filter(concept_name=concept)[0]
            print(concept_saved_rec.concept_name)
            #saved_rec=save_rec.save()
            concept_ids.append(concept_saved_rec.concept_id)
    return ','.join([str(i) for i in concept_ids])

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
    tags=[]
    for li in lis:
      tags.append(li.text)

    h2s=soup.find_all("p")
    abstract=h2s[3].get_text()
  return tags,abstract


def get_scraped_content(year):
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
            print(tags)
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
            data_json={}
            data_json["title"]=title
            data_json["abstract"]=abstract
            data_json["url"]=article_url
            data_json["domain"]=publication
            data_json["concepts"]=tags
            insert_article(data_json)

def get_preferences():
    from codeletter.models import Concept

    res=[]
    concepts_list=Concept.objects.all()
    for concept in concepts_list:
        json_response_ele={}
        json_response_ele['id']=concept.concept_id
        json_response_ele['concept_name']=concept.concept_name
        res.append(json_response_ele)
    print(res)

def update_preferences(user_data):
#user_data={"user_name":1,"preferences":[{"id":"1","concept_name":"asd"},{"id":"2","concept_name":"asda"}]}
    from codeletter.models import UserPreference,User,UserBadge
    user_object=User.objects.filter(username=user_data["user_name"])[0]
    
    try:
        user_preference_rec = UserPreference.objects.filter(user_id=user_object.pk)
    except UserPreference.DoesNotExist:
        user_preference_rec = None

    preference_list=user_data["preferences"]
    preference_value_list=[]
    concept_badge_data=[]
    for preference in preference_list:
        preference_id=preference["id"]
        preference_value_list.append(preference_id)

        concept_badge={}
        concept_badge["concept_id"]=preference_id
        concept_badge["user_badge"]=preference["user_badge"]
        concept_badge_data.append(concept_badge)

    preference_value=','.join(preference_value_list)

    if(user_preference_rec!=None):
        user_preference_rec.concept_ids=preference_value
        UserBadge.objects.filter(user_id=user_object.pk).delete()
    else:
        user_preference_rec=UserPreference(user_data.pk,preference_value)
    user_preference_rec.save()
    for concept_badge in concept_badge_data:
        concept_badge_rec=UserBadge(user_data.pk,concept_badge["concept_id"],concept_badge["user_badge"])
        concept_badge_rec.save()

def get_concept_badges(user_name):
    from codeletter.models import UserBadge,User
    user_object=User.objects.filter(username=user_name)[0]

    res=[]
    user_badges_list=UserBadge.objects.filter(user_id=user_object.pk)
    for user_badge_ele in user_badges_list:
        json_object={}
        json_object["concept_id"]=user_badge_ele.concept_id
        json_object["user_badge"]=user_badge_ele.user_badge
        res.append(json_object)
    return res