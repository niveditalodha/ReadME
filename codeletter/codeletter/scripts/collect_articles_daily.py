# This function will daily collect data from websites and store it in the database
def cronjob():
    from codeletter.utils import get_scraped_content
    from codeletter.models import Concept, Article
cronjob()