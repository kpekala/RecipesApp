import {Component, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import { ShoppingListService } from './shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit{

  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(){
    this.ingredients = this.shoppingListService.getIngredients();
    
    this.shoppingListService.onIngredientsChanged.subscribe(
      (ingredients: Ingredient[]) =>{
        this.ingredients = ingredients;
      }
    );
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }
}
