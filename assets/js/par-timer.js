(function($) {
    let playing = false;

    $('#play').on('click', playBeep);

    $(document).on('keydown', function (event) {
        if (event.which === 32) {
            $(':focus').blur();
            playBeep();
        }
    });

    let existingValues = localStorage.getItem('par-timer');

    if (existingValues !== null) {
        existingValues = JSON.parse(existingValues);
        $.each(existingValues, function (index, element) {
            let $element = $('[name="'+element.name+'"]');
            if ($element.is(':checkbox')) {
                $element.attr('checked', 'checked');
            } else {
                $element.val(element.value);
            }
        });
    }

    function doBeep() {
        $('#beep')[0].play().then(function () {
            console.log('playing');
        }).catch(function (e) {
            console.log(e);
        });
    }

    function playBeep() {
        let isPar = $('#par_timer').is(':checked');
        let min   = $('#min_delay').val() * 1000;
        let max   = $('#max_delay').val() * 1000;

        let delay = randomIntFromInterval(min, max);

        let values = $("#par-timer-form").serializeArray();

        localStorage.setItem('par-timer', JSON.stringify(values));

        if (!playing) {
            $('#play').addClass('disabled');
            playing = true;

            setTimeout(function () {
                doBeep();
                if (isPar) {
                    setTimeout(function () {
                        doBeep();
                        playing = false;
                        $('#play').removeClass('disabled');
                    }, $('#par_delay').val() * 1000);
                } else {
                    playing = false;
                    $('#play').removeClass('disabled');
                }
            }, delay);
        }


    }

    function randomIntFromInterval(min, max) // min and max included
    {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
})(jQuery);
