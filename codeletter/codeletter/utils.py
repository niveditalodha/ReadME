def get_scraped_content():
    pass

def get_sent_articles(user_id):
    from codeletter.models import SentArticle, Concept, Article
    objs = SentArticle.objects.filter(user_id=user_id).order_by('-sent_date')
    json_data = []
    if len(objs) == 0:
        return json_data
    for article in range(min(len(objs),10)):
        concept_ids = objs[article].concept_ids
        concept_ids = list(map(int,concept_ids.split(",")))
        json_data.append({})
        json_data[article]["Concept"] = []
        for concept_no in concept_ids:
            concepts = Concept.objects.filter(concept_id=concept_no)
            concept = concepts[0].concept_name
            json_data[article]["Concept"].append(concept)
        article_objs = Article.objects.filter(article_id=objs[article].sent_article_id)
        article_obj = article_objs[0]
        json_data[article]["Title"] = article_obj.title
        json_data[article]["Abstract"] = article_obj.abstract
        json_data[article]["URL"] = article_obj.url
        json_data[article]["Domain"] = article_obj.domain
        json_data[article]["DOI"] = article_obj.doi
    return json_data

def get_random_articles():
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
    print(to_send_objs)
    for i in range(len(to_send_objs)):
        concept_ids = objs[to_send_objs[i]].concept_ids
        concept_ids = list(map(int,concept_ids.split(",")))
        json_data.append({})
        json_data[i]["Concept"] = []
        for concept_no in concept_ids:
            concepts = Concept.objects.filter(concept_id=concept_no)
            concept = concepts[0].concept_name
            json_data[i]["Concept"].append(concept)
        article_obj = objs[to_send_objs[i]]
        json_data[i]["Title"] = article_obj.title
        json_data[i]["Abstract"] = article_obj.abstract
        json_data[i]["URL"] = article_obj.url
        json_data[i]["Domain"] = article_obj.domain
        json_data[i]["DOI"] = article_obj.doi
    return json_data


def update_read_flag(username, sent_article_id):
    from codeletter.models import SentArticle, Concept
    pass