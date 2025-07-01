from django.shortcuts import redirect
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from api.views import index


urlpatterns = [
  path('', index, name='home'),
  #  path('', TemplateView.as_view(template_name='index.html'), name='home'),

    #path('', lambda request: redirect('api/')), 
  #  path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
