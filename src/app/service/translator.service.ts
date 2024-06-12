import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslateRequestBody } from 'src/app/Models/TranslateRequestBody';
import { Translation } from 'src/app/Models/Translation';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {

  private apiUrl = 'http://localhost:8080'; // Define tu URL base del backend aquí
  private microsoftTranslatorUrl = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0'; // URL de Microsoft Translator

  private translatorKey = '91b6a3785f444aa8be105167862b6daa'; // Reemplaza esto con tu clave de suscripción a Microsoft Translator
  private translatorRegion = 'eastus'; // Reemplaza esto con tu región (por ejemplo, 'eastus')

  constructor(private http: HttpClient) { }

  translateText(text: string, from: string, to: string): Observable<string> {
    const url = `${this.microsoftTranslatorUrl}&from=${from}&to=${to}`;
    const body = [{ Text: text }];
    const headers = new HttpHeaders({
      'Ocp-Apim-Subscription-Key': this.translatorKey,
      'Ocp-Apim-Subscription-Region': this.translatorRegion,
      'Content-Type': 'application/json'
    });

    return this.http.post<any[]>(url, body, { headers }).pipe(
      map(response => {
        if (response && response.length > 0 && response[0].translations && response[0].translations.length > 0) {
          return response[0].translations[0].text;
        } else {
          throw new Error('Unexpected response format');
        }
      })
    );
  }

  getAllTranslations(): Observable<any[]> {
    const url = `${this.apiUrl}/translate/all`;
    return this.http.get<any[]>(url);
  }

  saveTranslation(requestText: string, translatedText: string, fromLang: string, toLang: string): Observable<Translation> {
    const url = `${this.apiUrl}/translate`;
    const body: TranslateRequestBody = {
      text: requestText,
      from: fromLang,
      to: toLang
    };
    return this.http.post<Translation>(url, body);
  }

  deleteTranslation(id: number): Observable<void> {
    const url = `${this.apiUrl}/translate/delete/${id}`;
    return this.http.delete<void>(url);
  }
}
