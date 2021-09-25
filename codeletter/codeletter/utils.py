def get_scraped_content():
    pass

def get_sent_articles(username):
    from codeletter.models import SentArticle, Concept, Article

    objs = SentArticle.objects.filter(username=username).order_by('sent_date').desc()
    json_data = []
    json_data = [{"Concepts":[]},{},{}]
    if len(objs) == 0:
        return json_data
    for article in range(10):
        concept_ids = objs[article].concept_ids
        concept_ids = list(concept_ids.split(","))
        json_data.append({})
        json_data[article]["Concept"] = []
        for concept_no in range(concept_ids):
            concepts = Concept.objects.filter(concept_id=concept_no)
            concept = concepts[0].concept_name
            json_data[article]["Concept"].append(concept)
        article_objs = Article.objects.filter(article_id=objs[article].sent_article_id)
        json_data[article]["Title"] = objs[article].title

        

    