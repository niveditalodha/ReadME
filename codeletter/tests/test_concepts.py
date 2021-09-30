from django.test import TestCase
from codeletter.models import Concept

class ConceptTestCase(TestCase):
	def setUp(self):
		Concept.objects.create(concept_name="AI_test")
		Concept.objects.create(concept_name="ML_test")

	def test_read_concepts(self):
		AI = Concept.objects.get(concept_name="AI_test")
		ML = Concept.objects.get(concept_name="ML_test")
		self.assertEqual(AI.concept_name, "AI_test")
		self.assertEqual(ML.concept_name, "ML_test")

	def test_write_concepts(self):
		concept_obj=Concept.objects.create(concept_name="AI_write_test")
		self.assertEqual(concept_obj.concept_name,"AI_write_test")

	def test_update_concepts(self):
		concept_obj=Concept.objects.get(concept_name="AI_test")
		concept_obj.concept_name="AI_update_test"
		id=concept_obj.concept_id
		concept_obj.save()

		AI = Concept.objects.get(concept_id=id)
		self.assertEqual(AI.concept_name, "AI_update_test")

	def test_delete_concepts(self):
		AI = Concept.objects.get(concept_name="AI_test")
		del_concept = AI.delete()
		self.assertFalse(Concept.objects.filter(pk=AI.pk).exists())
