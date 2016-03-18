from django.shortcuts import render
from django.conf import settings
from django.core.mail import send_mail
from django.http import JsonResponse, HttpResponse

from .forms import ContactForm

def index(request):
    template = 'index.html'
    name = ''

    contact_form = ContactForm(request.POST or None)

    python_queryset = [' Django & Django REST Framework', 'Scalable, load-balanced, highly available environments', 'Custom Authentication/Authorization', 'ORM and Database management', '3rd party libraries e.g Virtualenv, Virtualenvwrapper, crispy_forms, django-registration-redux, OAuth etc.', "3rd party API's e.g Twilio, Google Maps and more."]

    ui_queryset = ['HTML5/CSS3 ', 'Bootstrap 3+', 'Custom and 3rd party font-faces and iconic fonts e.g FontAwesome', 'Responsive CSS Sprites', 'Intermediate to Advanced Knowledge of Vanilla JS (ES5) and Jquery', 'Ajax and Animation!' ]

    osx_queryset = ['Intermediate knowledge of Ubuntu Linux/BASH', 'SSH, VirtualBox and Vagrant', 'Postgresql/MySQL/sqlite3', 'Version control with Git', 'VIM!']

    if request.user.is_authenticated():
        current_user = request.user.get_full_name()
        name,domain = current_user.split('@')

    context = {
        'username': name,
        'py_query': python_queryset,
        'ui_query': ui_queryset,
        'osx_query': osx_queryset,
        'contact_form': contact_form,
    }

    return render(request, template, context)

def contact_email(request):
    # contact_form = ContactForm(request.POST)

    if request.method == 'POST':
        contact_name = request.POST.get('contact_name')
        contact_email = request.POST.get('contact_email')
        contact_message = request.POST.get('contact_message')

        request_data = {'name':contact_name, 'email':contact_email, 'message':contact_message}

        contact_form = ContactForm(request_data)


        if contact_form.is_valid():
            response_data = {}
            form_name = contact_form.cleaned_data.get('name')
            form_email = contact_form.cleaned_data.get('email')
            form_message = contact_form.cleaned_data.get('message')

            subject = 'Jquery test contact'
            from_email = settings.EMAIL_HOST_USER
            to_email = [form_email]

            email_message = "%s: %s via %s"%(
                form_name,
                form_message,
                form_email)

            send_mail(subject,
                email_message,
                from_email,
                to_email,
                fail_silently=False)

            response_data['result'] = "success"
            response_data['name'] = form_name
            response_data['email'] = form_email

            return JsonResponse(response_data)
        else:
            error_message = dict([(key, [str(error) for error in value]) for key, value in contact_form.errors.items()])
            return JsonResponse({"result": error_message})
            # return HttpResponse(contact_form.errors.items(),status=404)
