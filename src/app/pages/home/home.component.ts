import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink, NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  cards = [
    {
      id: 1,
      title: "Partners",
      subtitle: "Synergy wins games",
      description: "Find the best bot lane partner based on this season's win rate!",
      image: "/bot.webp",
      link: "/bottom",
      color: "blue",
    },
    {
      id: 2,
      title: "Enemies",
      subtitle: "Outpick, outplay",
      description: "Discover your opponent's counterpick in the mid lane",
      image: "/mid.webp",
      link: "/mid",
      color: "gold",
    },
    {
      id: 3,
      title: "Diff",
      subtitle: "Please gank",
      description: "A list of the best junglers of the season!",
      image: "/jg.webp",
      link: "/news",
      color: "red",
    },
    {
      id: 4,
      title: "Top",
      subtitle: "Help",
      description: "No idea what's going on up here, what they need, or what they’d like to know",
      image: "/top.webp",
      link: "/community",
      color: "green",
    },
  ]
}
