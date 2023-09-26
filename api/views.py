from rest_framework import generics
from django.shortcuts import get_object_or_404
from api.models import Collection, Flashcard
from api.serializers import CollectionSerializer, FlashcardSerializer


class CollectionListCreateView(generics.ListCreateAPIView):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer


class CollectionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer


class FlashcardListCreateView(generics.ListCreateAPIView):
    serializer_class = FlashcardSerializer

    def get_queryset(self):
        collection_id = self.request.query_params.get("collection_id")
        if collection_id is not None:
            collection = get_object_or_404(Collection, pk=collection_id)
            queryset = Flashcard.objects.filter(collection=collection)

        else:
            queryset = Flashcard.objects.all()

        return queryset


class FlashcardDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Flashcard.objects.all()
    serializer_class = FlashcardSerializer
