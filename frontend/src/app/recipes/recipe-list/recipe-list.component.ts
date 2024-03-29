import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipesService} from '../recipes.service';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];

  recipesChangedSubscription: Subscription;

  constructor(private recipesService: RecipesService) {

  }

  ngOnInit() {
    this.recipes = this.recipesService.getRecipes();

    this.recipesChangedSubscription = this.recipesService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    )
  }

  ngOnDestroy() {
    this.recipesChangedSubscription.unsubscribe();
  }

}
