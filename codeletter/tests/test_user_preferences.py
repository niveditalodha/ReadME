from django.test import TestCase
from codeletter.models import UserPreference, User

class UserPreferenceTestCase(TestCase):
    def setUp(self):
        test_user=User.objects.create(username="test_user")

        UserPreference.objects.create(user_id=test_user,concept_ids="1,2")

    def test_read_user_preferences(self):
        user_obj = User.objects.get(username="test_user")
        user_pref_obj=UserPreference.objects.get(user_id=user_obj)
        self.assertEqual(user_pref_obj.concept_ids, "1,2")

    def test_write_user_preferences(self):
        test_user=User.objects.create(username="test_write_user")
        user_pref_obj=UserPreference.objects.create(user_id=test_user,concept_ids="1,2,3")
        self.assertEqual(user_pref_obj.concept_ids,"1,2,3")

    def test_update_user_preferences(self):
        test_user=User.objects.get(username="test_user")
        user_pref_obj=UserPreference.objects.get(user_id=test_user)
        user_pref_obj.concept_ids="1,2"
        user_pref_obj.save()

        user_pref_obj_updated=UserPreference.objects.get(user_id=test_user)
        self.assertEqual(user_pref_obj_updated.concept_ids, "1,2")

    def test_delete_user_preferences(self):
        test_user=User.objects.get(username="test_user")
        user_pref_obj = UserPreference.objects.get(user_id=test_user)
        del_user_pref = user_pref_obj.delete()
        self.assertFalse(UserPreference.objects.filter(pk=user_pref_obj.pk).exists())
