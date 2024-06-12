import { Component, OnInit } from '@angular/core';
import { TranslatorService } from 'src/app/service/translator.service';
import { Router } from '@angular/router';
import { Translation } from 'src/app/Models/Translation';

@Component({
  selector: 'app-traductor-text',
  templateUrl: './traductor-text.component.html',
  styleUrls: ['./traductor-text.component.css']
})
export class TraductorTextComponent implements OnInit {

  textToTranslate: string = '';
  fromLang: string = 'en';
  toLang: string = 'es';
  translatedText: string = '';

  translations: Translation[] = [];
  languages = [
    { code: 'af', name: 'Afrikaans' },
    { code: 'sq', name: 'Albanian' },
    { code: 'am', name: 'Amharic' },
    { code: 'ar', name: 'Arabic' },
    { code: 'hy', name: 'Armenian' },
    { code: 'as', name: 'Assamese' },
    { code: 'az', name: 'Azerbaijani' },
    { code: 'ba', name: 'Bashkir' },
    { code: 'eu', name: 'Basque' },
    { code: 'bn', name: 'Bengali' },
    { code: 'bs', name: 'Bosnian' },
    { code: 'bg', name: 'Bulgarian' },
    { code: 'my', name: 'Burmese' },
    { code: 'ca', name: 'Catalan' },
    { code: 'zh', name: 'Chinese' },
    { code: 'hr', name: 'Croatian' },
    { code: 'cs', name: 'Czech' },
    { code: 'da', name: 'Danish' },
    { code: 'dv', name: 'Divehi, Dhivehi, Maldivian' },
    { code: 'nl', name: 'Dutch' },
    { code: 'en', name: 'English' },
    { code: 'et', name: 'Estonian' },
    { code: 'fo', name: 'Faroese' },
    { code: 'fj', name: 'Fijian' },
    { code: 'fi', name: 'Finnish' },
    { code: 'fr', name: 'French' },
    { code: 'gl', name: 'Galician' },
    { code: 'ka', name: 'Georgian' },
    { code: 'de', name: 'German' },
    { code: 'el', name: 'Greek, Modern' },
    { code: 'gu', name: 'Gujarati' },
    { code: 'ht', name: 'Haitian, Haitian Creole' },
    { code: 'ha', name: 'Hausa' },
    { code: 'he', name: 'Hebrew (modern)' },
    { code: 'hi', name: 'Hindi' },
    { code: 'hu', name: 'Hungarian' },
    { code: 'id', name: 'Indonesian' },
    { code: 'ga', name: 'Irish' },
    { code: 'ig', name: 'Igbo' },
    { code: 'is', name: 'Icelandic' },
    { code: 'it', name: 'Italian' },
    { code: 'iu', name: 'Inuktitut' },
    { code: 'ja', name: 'Japanese' },
    { code: 'kn', name: 'Kannada' },
    { code: 'ks', name: 'Kashmiri' },
    { code: 'kk', name: 'Kazakh' },
    { code: 'km', name: 'Khmer' },
    { code: 'ko', name: 'Korean' },
    { code: 'ku', name: 'Kurdish' },
    { code: 'la', name: 'Latin' },
    { code: 'lo', name: 'Lao' },
    { code: 'lt', name: 'Lithuanian' },
    { code: 'lv', name: 'Latvian' },
    { code: 'mk', name: 'Macedonian' },
    { code: 'mg', name: 'Malagasy' },
    { code: 'ms', name: 'Malay' },
    { code: 'ml', name: 'Malayalam' },
    { code: 'mt', name: 'Maltese' },
    { code: 'mi', name: 'Māori' },
    { code: 'mr', name: 'Marathi (Marāṭhī)' },
    { code: 'mn', name: 'Mongolian' },
    { code: 'nb', name: 'Norwegian Bokmål' },
    { code: 'ne', name: 'Nepali' },
    { code: 'no', name: 'Norwegian' },
    { code: 'or', name: 'Oriya' },
    { code: 'pa', name: 'Panjabi, Punjabi' },
    { code: 'fa', name: 'Persian' },
    { code: 'pl', name: 'Polish' },
    { code: 'ps', name: 'Pashto, Pushto' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ro', name: 'Romanian, Moldavian, Moldovan' },
    { code: 'ru', name: 'Russian' },
    { code: 'sd', name: 'Sindhi' },
    { code: 'sm', name: 'Samoan' },
    { code: 'sr', name: 'Serbian' },
    { code: 'sn', name: 'Shona' },
    { code: 'si', name: 'Sinhala, Sinhalese' },
    { code: 'sk', name: 'Slovak' },
    { code: 'sl', name: 'Slovene' },
    { code: 'so', name: 'Somali' },
    { code: 'st', name: 'Southern Sotho' },
    { code: 'es', name: 'Spanish, Castilian' },
    { code: 'sw', name: 'Swahili' },
    { code: 'sv', name: 'Swedish' },
    { code: 'ta', name: 'Tamil' },
    { code: 'te', name: 'Telugu' },
    { code: 'th', name: 'Thai' },
    { code: 'ti', name: 'Tigrinya' },
    { code: 'bo', name: 'Tibetan Standard, Tibetan, Central' },
    { code: 'tk', name: 'Turkmen' },
    { code: 'tl', name: 'Tagalog' },
    { code: 'tn', name: 'Tswana' },
    { code: 'to', name: 'Tonga (Tonga Islands)' },
    { code: 'tr', name: 'Turkish' },
    { code: 'tt', name: 'Tatar' },
    { code: 'ug', name: 'Uighur, Uyghur' },
    { code: 'uk', name: 'Ukrainian' },
    { code: 'ur', name: 'Urdu' },
    { code: 'uz', name: 'Uzbek' },
    { code: 'vi', name: 'Vietnamese' },
    { code: 'cy', name: 'Welsh' },
    { code: 'xh', name: 'Xhosa' },
    { code: 'yo', name: 'Yoruba' },
    { code: 'zu', name: 'Zulu' }
  ];

  constructor(
    private translatorService: TranslatorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllTranslations();
  }

  translateText(): void {
    if (!this.textToTranslate.trim()) {
      console.warn('Text to translate is empty.');
      return;
    }

    this.translatorService.translateText(this.textToTranslate, this.fromLang, this.toLang)
      .subscribe(translatedText => {
        this.translatedText = translatedText;

        // Guardar la traducción automáticamente
        this.saveTranslation(this.textToTranslate, this.translatedText, this.fromLang, this.toLang);
      }, error => {
        console.error('Error translating text:', error);
      });
  }

  saveTranslation(requestText: string, translatedText: string, fromLang: string, toLang: string): void {
    this.translatorService.saveTranslation(requestText, translatedText, fromLang, toLang).subscribe(() => {
      this.getAllTranslations(); // Refresh the list of translations after a new translation
    }, error => {
      console.error('Error saving translation:', error);
    });
  }

  getAllTranslations(): void {
    this.translatorService.getAllTranslations().subscribe(translations => {
      this.translations = translations;
    }, error => {
      console.error('Error fetching translations:', error);
    });
  }

  swapLanguages(): void {
    const temp = this.fromLang;
    this.fromLang = this.toLang;
    this.toLang = temp;
  }

  navigateToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
