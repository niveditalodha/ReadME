from django.test import TestCase
from codeletter.utils import insert_article

class ArtcilesTestCase(TestCase):
    test_article = {}
    def setUp(self):
        self.test_article["title"] = "https://towardsdatascience.com/AIinSE",
        self.test_article["abstract"] = "Artificail Intelligence in SE",
        self.test_article["url"] = "Introducation"
        self.test_article["domain"] = "pulication"
        self.test_article["concepts"] = "1,2"

    def test_insert_article(self):
	    new_article = insert_article(self.test_article)
	    self.assertEqual(self.test_article["title"], new_article.title)
