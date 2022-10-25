import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.inteface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string  = 'Xemb79FnkSbEZj2wEntC7oZwfDqdJWvt';
  private servicioURL : string ='https://api.giphy.com/v1/gifs';
  private _historial: string[] = [] ;
  public resultados: Gif[] = [];
  
  get historial(){
    
    return [...this._historial];
  }

constructor(private http:HttpClient){
  if (localStorage.getItem('historial') ){
    this._historial = JSON.parse(localStorage.getItem('historial')!);
  }
  if (localStorage.getItem('resultados') ){
    this.resultados = JSON.parse(localStorage.getItem('resultados')!);
  }
}

  buscarGifs(query: string = '' ){

    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,9);
      localStorage.setItem('historial',JSON.stringify(this._historial));    
    }

    const params = new HttpParams()
    .set('api_key',this.apiKey)
    .set('q',query)
    .set('limit',10);

    this.http.get<SearchGifsResponse>(`${this.servicioURL}/search`,{params})
    .subscribe((resp) => {
      //console.log(resp.data);
      this.resultados = resp.data;
      localStorage.setItem('resultados',JSON.stringify(this.resultados));
    });
    
  }
}
