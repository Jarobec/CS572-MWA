import { Component, OnInit } from '@angular/core';
import { QuoteDataService } from '../quote-data.service';

class Quote {
  anime!: string;
  character!: string;
  quote!: string;

  constructor(anime: string, character: string, quote: string) {
    this.anime = anime;
    this.character = character;
    this.quote = quote;
  }
}

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css'],
})
export class QuotesComponent implements OnInit {
  quotes: Quote[] = [];

  constructor(private quoteService: QuoteDataService) {}

  ngOnInit(): void {
    this.quoteService.getQuotes().subscribe((quotes) => (this.quotes = quotes));
  }
}
