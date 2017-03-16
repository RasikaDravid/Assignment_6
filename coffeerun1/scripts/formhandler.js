var dialogueBox_popUp = false;
var $ = window.jQuery;

(function(window) {
    'use strict';
    var App = window.App || {};


    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();
            var strength = $('#strengthLevel').val();
            var flavor = $('#flavorshot').find(':selected').val();
            var size = $('input[name=size]:checked').val();
            if (strength > 66 && flavor != '' && size === 'coffeezilla' && dialogueBox_popUp === false) {

                console.log('Modal is displayed now');
                dialogueBox_popUp = true;
                $('#myModal').modal('show');
            } else {
                var data = {};
                $(this).serializeArray().forEach(function(item) {
                    data[item.name] = item.value;
                    console.log(item.name + ' is ' + item.value);
                });
                console.log(data);
                fn(data);
                this.reset();
                this.elements[0].focus();
                dialogueBox_popUp = false;
                $('#sliderBar').hide();
                $('#strength-range').empty();
                $('#strength-range').append('Caffeine percentage: 30');
                $('#strength-range').css('color', 'green');
            }
        });
    };

    App.FormHandler = FormHandler;
    window.App = App;
})(window);

$('#strengthLevel').change(function() {
    document.getElementById('[strength-range]');
    $('#strength-range').empty();
    $('#strength-range').append('Caffeine percentage: ' + this.value);
    if (this.value <= 33) {
        $('#strength-range').css('color', 'green');
    } else if (this.value > 33 && this.value <= 85) {
        $('#strength-range').css('color', 'yellow');
    } else {
        $('#strength-range').css('color', 'red');
    }
});

$('#powerUpClaim').on('click', function() {
    $('#myModal').modal('hide');
    $('#powerUpComboBox').show();
});

$('#noPowerup').on('click', function() {
    $('#myModal').modal('hide');
});
