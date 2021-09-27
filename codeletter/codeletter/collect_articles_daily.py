# This function will daily send data to users
from django.core.mail import send_mail

def send_email(details):
    from codeletter.models import SentArticle
    if len(details)>0:
        for detail in details:
            
            if(send_mail(
                'ARTICLE OF THE DAY - '+detail['title'],
                detail['abstract'],
                'codeletter',
                [detail['user_email']],
                fail_silently=False,
            )):
                print(detail['user_id'])
                SentArticle.objects.create(user_id = detail['user_id'], article_id=detail['article_id'], concept_ids=detail['concept_ids'])
            

def cronjob():
    from codeletter.utils import get_scraped_content
    from codeletter.models import Concept, Article, UserPreference, SentArticle
    from django.contrib.auth.models import User
    import random

    article_details = []
    user_objs = User.objects.all()
    for user in user_objs:
        print(user.pk)
        preference_obj = UserPreference.objects.filter(user_id=user.pk)[0]
        preferences = list(preference_obj.concept_ids.split(','))
        if len(preferences) == 1:
            preference = preferences[0]
        elif len(preferences) > 1:
            preference = random.randint(0, len(preferences)-1)
            preference = preferences[preference]
        else:
            all_preferences = Concept.objects.all()
            a = random.randint(0, len(all_preferences)-1)
            preference = all_preferences[a].concept_id

        print(preference)
        article_objs = Article.objects.all()
        sent_article_objs = SentArticle.objects.filter(user_id=user.pk)
        for article in article_objs:
            if preference in list(article.concept_ids.split(',')):
                for sent_article_obj in sent_article_objs:
                    if preference in list(sent_article_obj.concept_ids.split(',')):
                        break
                else:

                    article_details.append({})
                    l = len(article_details)
                    article_details[l-1]['user_id'] = user
                    article_details[l-1]['user_email'] = user.email
                    article_details[l-1]['article_id'] = article
                    article_details[l-1]['concept_ids'] = article.concept_ids
                    article_details[l-1]['preference'] = Concept.objects.filter(concept_id=preference)[0].concept_name
                    article_details[l-1]['title'] = article.title
                    article_details[l-1]['abstract'] = article.abstract
                    article_details[l-1]['doi'] = article.doi
                    article_details[l-1]['url'] = article.url
                    article_details[l-1]['domain'] = article.domain
                    break

    send_email(article_details)
        
