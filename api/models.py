from django.db import models


class Collection(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.name


class Flashcard(models.Model):
    collection = models.ForeignKey(Collection, on_delete=models.CASCADE)

    front = models.TextField()
    back = models.TextField()

    def __str__(self) -> str:
        return f"{self.front} -> {self.back}"
