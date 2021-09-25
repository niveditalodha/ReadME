def get_scraped_content():
    pass

def get_sent_articles(username):
    from codeletter.models import SentArticle, Concept

    objs = SentArticle.objects.filter(username=username).order_by('sent_date').desc()
    json_data = []
    if len(objs) == 0:
        return json_data
    for article in range(10):
        concept_ids = objs[article].concept_ids
        concept_ids = list(concept_ids.split(","))
        for concept_no in range(concept_ids):
            pass
        

    