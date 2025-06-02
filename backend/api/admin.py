from django.contrib import admin
from django.core.exceptions import ValidationError
from django.forms.models import BaseInlineFormSet
from .models import HausZuVerkaufen, HausBild

class HausBildInlineFormSet(BaseInlineFormSet):
    def clean(self):
        super().clean()
        bilder_count = len([
            form for form in self.forms 
            if form.cleaned_data and not form.cleaned_data.get("DELETE", False)
        ])
        if bilder_count < 3:
            raise ValidationError("Mindestens 3 Bilder sind erforderlich.")

class HausBildInline(admin.TabularInline):
    model = HausBild
    formset = HausBildInlineFormSet
    extra = 3

@admin.register(HausZuVerkaufen)
class HausZuVerkaufenAdmin(admin.ModelAdmin):
    inlines = [HausBildInline]
