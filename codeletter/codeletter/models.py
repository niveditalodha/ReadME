from django.db import models

class Article(models.Model):
    article_id = models.BigAutoField(max_length=6, primary_key=True)
    title = models.CharField(max_length=100)
    abstract = models.CharField(max_length=100)
    url = models.CharField(max_length=100)
    domain = models.CharField(max_length=100)
    concept = models.CharField(max_length=100)
    doi = models.CharField(max_length=100, null=True, blank=True)
    image = models.CharField(max_length=100, null=True, blank = True)