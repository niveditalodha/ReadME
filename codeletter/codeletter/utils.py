def get_scraped_content():
    pass

def get_sent_articles(username):
    from codeletter.models import SentArticle, Concept

    objs = SentArticle.objects.filter(username=username).order_by('sent_date').desc()
    json_data = []
    if len(objs) == 0:
        return json_data
    for i in range(10):
        concept_id = objs[i].concept_ids
        

    