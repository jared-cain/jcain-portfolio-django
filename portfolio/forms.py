from django import forms

class ContactForm(forms.Form):
    name = forms.CharField(max_length=66, widget=forms.TextInput(attrs={'class': 'contact-name'}))
    email = forms.EmailField(widget=forms.EmailInput(attrs={'class': 'contact-email'}))
    message = forms.CharField(max_length=140, strip=True, widget=forms.Textarea(attrs={'class':'dont_resize contact-message'}))
