<form>
    {{ if( state === 'new' ) { }}
        <label for="exercise__title">Exercise title: </label>
    <input type="text" id="exercise__title"
           class="exercise__title {{= exerciseEmpty ? 'exercise__title-error' : '' }}"/>
        <label for="exercise__weight">Weight: </label>
        <input type="text" id="exercise__weight" class="exercise__weight {{= weightEmpty ? 'exercise__weight-error' : '' }}"/>
        <button class=".approach__start">Start approach</button>
    {{ if( exercises ) { }}
    <ul class="exercise__autocomplete">
        {{ exercises.forEach( function ( exercise ) { }}
        <li>{{= exercise.exercize_title }}</li>
        {{ } ); }}
    </ul>
    {{ } }}
    {{ } else if ( state === 'started' ) { }}
        <button class=".approach__before-end">End approach</button>
    {{ } else if ( state === 'beforeEnd' ) { }}
        <label for="exercise__repetitions">Number of repetitions: </label>
        <input type="text" id="exercise__repetitions" class="exercise__repetitions {{= repetitionsEmpty ? 'exercise__repetitions-error' : '' }}"/>
        <button class=".approach__end">Submit approach</button>
    {{ } }}
</form>