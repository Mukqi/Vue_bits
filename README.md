# Vue_bits

A set of vuejs components, bits, and other code I made that can be quite useful.  Each item is self-contained and commented to include usage examples and other explanations if needed

## adjustable_timer.js

A simple timer that has a countdown progress bar and can have its time dynamically changed.  When the timer completes its countdown, it will "emit" a done signal which can be hooked into via VueJS to allow a function of the parent to be run.

![Screenshot of a number box and active button above a counting progress bar.](/img/adjustable_timer.png)

## circle_clock.js

A count-up pie clock of sorts drawn using SVG paths.  The fill of the pie is based on the input percentage.  The foreground and background colors can be changed.

![Screenshot of a circle clock partially filled in.](/img/circle_fill.png)

## fancy_multi_switch.js

A switch that can have as many switch positions as desired, just add a label (String) to the array.  Clicking that position will return the corrosponding position number of that value in the array.  

![Screenshot of a switch with multiple options.](/img/multi-switch-no-lock.png)

There is also an optional lock which can be enabled to prevent changing the switch without unlocking it first.

![Screenshot of a switch with multiple options which is locked from being edited.](/img/multi-switch-locked.png)
![Screenshot of a switch with multiple options which is unlocked from being edited.](/img/multi-switch-unlocked.png)
