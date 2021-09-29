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