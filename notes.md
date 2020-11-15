# Rules to override
- `.p-top_nav`
  - Top-most Nar Bar that contains the Search Bar and your profile access
  - Accepts `background-color`
  - `.p-top_nav__search`
    - Contained within the top nav bar
    - Accepts `background`, `border`, `box-shadow` and `color`
  - `.p-top_nav__button`
    - Any button in the top nav that's not the fake "search" button
    - Accepts the usual CSS properties
- `.p-channel_sidebar`
  - The (in)famous sidebar that contains all of your channels
  - Accepts `background` and `color`
    - Setting the `color` here only chanegs the collapsible header colors
  - `.p-channel_sidebar__link`
    - Any "clickable" channel link
    - Accepts the usual CSS properties
  - `.p-channel_sidebar__compose_button`
    - Most direct selector to the left panel's big-honkin "edit" button
    - Will likely need to sledgehammer with some `!important` overrides
- `.p-threads_view`
  - where all of the threads are
  - May be able to override the CSS variable `--sk_foreground_min_solid`

## Additional notes
- Will need to add corresponding `:hover` pseudo selectors for the additional hover colors

## Variable sniffing
```
.sk-client-theme--light {
  --sk_primary_foreground: 29, 28, 29; // Text color in messages and threads
  --sk_primary_background: 255, 255, 255; // Background color for threads and messages
  --sk_inverted_foreground: 255, 255, 255; // ??
  --sk_inverted_background: 29, 28, 29; // ??
  --sk_foreground_max: 29, 28, 29;
  --sk_foreground_high: 29, 28, 29;
  --sk_foreground_low: 29, 28, 29;
  --sk_foreground_min: 29, 28, 29;
  --sk_foreground_max_solid: 97, 96, 97;
  --sk_foreground_high_solid: 134, 134, 134;
  --sk_foreground_low_solid: 221, 221, 221;
  --sk_foreground_min_solid: 248, 248, 248;
  --sk_highlight: 18, 100, 163;
  --sk_highlight_hover: 11, 76, 140
}

.sk-client-theme--dark,
.sk-client-theme--light {
  --sk_highlight_accent: 29, 155, 209;
  --sk_secondary_highlight: 242, 199, 68
}

.sk-client-theme--dark {
  --sk_primary_foreground: 209, 210, 211;
  --sk_primary_background: 26, 29, 33;
  --sk_inverted_foreground: 26, 29, 33;
  --sk_inverted_background: 209, 210, 211;
  --sk_foreground_max: 232, 232, 232;
  --sk_foreground_high: 232, 232, 232;
  --sk_foreground_low: 232, 232, 232;
  --sk_foreground_min: 232, 232, 232;
  --sk_foreground_max_solid: 171, 171, 173;
  --sk_foreground_high_solid: 129, 131, 133;
  --sk_foreground_low_solid: 53, 55, 59;
  --sk_foreground_min_solid: 34, 37, 41;
  --sk_highlight: 29, 155, 209;
  --sk_highlight_hover: 29, 155, 209
}
```

Maybe we can do `document.documentElement.style.setProperty('--some-var', val)`?
