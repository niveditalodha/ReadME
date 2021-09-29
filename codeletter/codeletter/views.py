from django.http import HttpResponse

def home(request):
    return HttpResponse("Request ", request)

def get_random_articles(request):
    from codeletter.models import Concept, Article
    import random
    json_data = []
    objs = Article.objects.all()
    to_send_objs = []
    i = 0
    while i < min(len(objs),10):
        a = random.randint(0,min(len(objs)-1,9))
        if a not in to_send_objs:
            to_send_objs.append(a)
            i += 1
    for i in range(len(to_send_objs)):
        concept_ids = objs[to_send_objs[i]].concept_ids
        concept_ids = list(map(int,concept_ids.split(",")))
        json_data.append({})
        json_data[i]["concept_name"] = []
        json_data[i]["concept_id"] = []
        for concept_no in concept_ids:
            concepts = Concept.objects.filter(concept_id=concept_no)
            concept = concepts[0].concept_name
            json_data[i]["concept_name"].append(concept)
            json_data[i]["concept_id"].append(concept_no)
        article_obj = objs[to_send_objs[i]]
        json_data[i]["title"] = article_obj.title
        json_data[i]["abstract"] = article_obj.abstract
        json_data[i]["url"] = article_obj.url
        json_data[i]["domain"] = article_obj.domain
        json_data[i]["doi"] = article_obj.doi
    return HttpResponse(str(json_data))

def get_sent_articles(request):
    from django.contrib.auth.models import User
    from codeletter.models import SentArticle, Concept, Article
    # request = {"username":"nivedita"}

    username = request['username']
    user_id = User.objects.filter(username=username)[0].pk
    objs = SentArticle.objects.filter(user_id=user_id).order_by('-sent_date')
    json_data = []
    if len(objs) == 0:
        return json_data
    for article in range(min(len(objs),10)):
        concept_ids = objs[article].concept_ids
        concept_ids = list(map(int,concept_ids.split(",")))
        json_data.append({})
        json_data[article]["concept_name"] = []
        json_data[article]["concept_id"] = []
        for concept_no in concept_ids:
            concepts = Concept.objects.filter(concept_id=concept_no)
            concept = concepts[0].concept_name
            json_data[article]["concept_name"].append(concept)
            json_data[article]["concept_id"].append(concept_no)
        article_objs = Article.objects.filter(article_id=objs[article].sent_article_id)
        article_obj = article_objs[0]
        json_data[article]["title"] = article_obj.title
        json_data[article]["abstract"] = article_obj.abstract
        json_data[article]["url"] = article_obj.url
        json_data[article]["domain"] = article_obj.domain
        json_data[article]["doi"] = article_obj.doi
    return HttpResponse(str(json_data))


def update_read_flag(request):
    from django.contrib.auth.models import User
    from codeletter.models import SentArticle, Concept, UserBadge
    # request = {"username":"nivedita", "sent_article_id":1}
    username = request['username']
    sent_article_id = request['sent_article_id']
    user_id = User.objects.filter(username=username)[0].pk
    sent_article_obj = SentArticle.objects.filter(sent_article_id=sent_article_id, user_id = user_id)[0]
    sent_article_obj.read_flag = True
    sent_article_obj.save()
    concept_ids = sent_article_obj.concept_ids
    concept_ids = list(concept_ids.split(','))
    count = {}
    json_data = []
    for concept in concept_ids:
        count[concept] = 1
    total_articles = SentArticle.objects.filter(user_id = user_id)
    for article in total_articles:
        for j in count:
            if count[j] in list(article.concept_ids.strip(',')):
                if article.read_flag == True:
                    count[j] += 1
                    if count[j] > 5 and count[j] < 11:
                        obj = UserBadge.objects.filter(user_id=user_id, concept_id=j)[0]
                        obj.user_badge = 'Intermediate'
                        obj.save()
                    elif count[j] > 11:
                        obj.user_badge = 'Expert'
                        obj.save()
                    json_data.append({"user_id": user_id, "concept_id":j,"user_badge":obj.user_badge})
    return HttpResponse(str(json_data))

def get_concept_badges(user_name):
    from codeletter.models import UserBadge,User
    user_object=User.objects.filter(username=user_name)
    if(user_object):
        res=[]
        user_badges_list=UserBadge.objects.filter(user_id=user_object.pk)
        for user_badge_ele in user_badges_list:
            json_object={}
            json_object["concept_id"]=user_badge_ele.concept_id
            json_object["user_badge"]=user_badge_ele.user_badge
            res.append(json_object)
        return HttpResponse(str(res))
    else:
        return HttpResponse(str("No user badge details"))

def update_preferences(user_data):
#user_data={"user_name":1,"preferences":[{"id":"1","concept_name":"asd"},{"id":"2","concept_name":"asda"}]}
    user_data={"user_name":"nivedita","preferences":[{"concept_id":"2","concept_name":"concept3"}]}
    from codeletter.models import UserPreference,User,UserBadge, Concept
    user_object=User.objects.filter(username=user_data["user_name"])[0]
    
    try:
        user_preference_recs = UserPreference.objects.filter(user_id=user_object.pk)
    except UserPreference.DoesNotExist:
        user_preference_recs = None

    preference_list=user_data["preferences"]
    preference_value_list=[]
    concept_badge_data=[]
    for preference in preference_list:
        preference_id=preference["concept_id"]
        preference_value_list.append(preference_id)

        concept_badge={}
        concept_badge["concept_id"]=preference_id
        concept_badge_data.append(concept_badge)

    preference_value=','.join(preference_value_list)
    print(preference_value)
    if(user_preference_recs!=None):
        user_preference_rec=user_preference_recs[0]
        print(user_preference_rec.concept_ids)

        user_preference_rec.concept_ids=preference_value
        user_badge_rec=UserBadge.objects.filter(user_id=user_object.pk)
        if(user_badge_rec):
            UserBadge.objects.filter(user_id=user_object.pk).delete()
    else:
        user_preference_rec=UserPreference(user_data.pk,preference_value)
        print(user_preference_rec.pk)
    user_preference_rec.save()
    for concept_badge in concept_badge_data:
        print(concept_badge["concept_id"])
        concept_rec=Concept.objects.get(concept_id=concept_badge["concept_id"])
        concept_badge_rec=UserBadge(user_id=user_object,concept_id=concept_rec)
        concept_badge_rec.save()
    return HttpResponse(str("Updated preferences for user: "+user_data["user_name"]))

def get_preferences(request):
    request={"user_name":"nivedita"}
    from codeletter.models import Concept, UserPreference, User
    res=[]
    concepts_list=Concept.objects.all()
    user_object=User.objects.filter(username=request["user_name"])[0]
    user_preferences_recs=UserPreference.objects.filter(user_id=user_object)
    user_concept_ids=[]
    if(user_preferences_recs):
        user_concept_ids=user_preferences_recs[0].concept_ids.split(",")
    for concept in concepts_list:
        json_response_ele={}
        json_response_ele['concept_id']=concept.concept_id
        json_response_ele['concept_name']=concept.concept_name
        if(str(concept.concept_id) in user_concept_ids):
            json_response_ele['checked']=True
        else:
            json_response_ele['checked']=False
        res.append(json_response_ele)
    return HttpResponse(str(res))
