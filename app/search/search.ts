import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface InventoryItem {
  itemId: number; itemName: string; category: string; quantity: number; price: number;
  supplierName: string; stockStatus: string; isPopular: boolean; comment?: string;
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class Search {
  inventoryList: InventoryItem[] = [];
  searchKeyword = '';
  searchResults: InventoryItem[] = [];

  searchItems() {
    if (!this.searchKeyword) { this.searchResults = [...this.inventoryList]; return; }
    this.searchResults = this.inventoryList.filter(i =>
      i.itemName.toLowerCase().includes(this.searchKeyword.toLowerCase())
    );
  }

  showPopularOnly() {
    this.searchResults = this.inventoryList.filter(i => i.isPopular);
  }

  getStockColor(status: string) {
    if (status === 'Out of Stock') return 'red';
    if (status === 'Low Stock') return 'orange';
    return 'green';
  }
}