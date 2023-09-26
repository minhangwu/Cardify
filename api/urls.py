from django.urls import path
from api.views import (
    CollectionListCreateView,
    CollectionDetailView,
    FlashcardListCreateView,
    FlashcardDetailView,
)

urlpatterns = [
    path("collections/", CollectionListCreateView.as_view()),
    path("collections/<int:pk>/", CollectionDetailView.as_view()),
    path("flashcards/", FlashcardListCreateView.as_view()),
    path("flashcards/<int:pk>/", FlashcardDetailView.as_view()),
]
