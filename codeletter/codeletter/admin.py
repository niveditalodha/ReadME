from django.contrib import admin

from .models import Article, Concept, UserPreference, SentArticle, UserBadge


admin.site.register(Article)
admin.site.register(Concept)
admin.site.register(UserPreference)
admin.site.register(SentArticle)
admin.site.register(UserBadge)
