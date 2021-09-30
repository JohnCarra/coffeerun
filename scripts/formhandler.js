const myForm = document.getElementById("myForm");

(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    class FormHandler {
        constructor(selector) {
            if (!selector) {
                throw new Error('No selector provided');
            }

            this.$formElement = $(selector);
            if (this.$formElement.length === 0) {
                throw new Error('Could not find element with selector: ' + selector);
            }
        }

        addSubmitHandler(fn) {
            console.log('Setting submit handler for form');
            this.$formElement.on('submit', function (event) {
                event.preventDefault();

                // var data = $(this).serializeArray();
                var data = {};
                $(this).serializeArray().forEach(function (item) {
                    data[item.name] = item.value;
                    console.log(item.name + ' is ' + item.value);
                });
                console.log(data);
                fn(data);
                this.reset();
                this.elements[0].focus();
            });
        }
    }

    // Submit Handler for payment form 
    $(function () {
        $("#myForm button").click(function (ev) {
            ev.preventDefault()

            if ($(this).attr("value") == "paymentSubmit") {

                //sets the value of the name in the modal box that is given by the text box titled 'Name'
                var setName = $('#name').val();

                //sets the value of the title by the selected radio button ex. Ace
                var titleOutput = $("input:radio[name=title]:checked").val();
                document.getElementById('titleOutput').innerHTML = titleOutput;

                //logs a message to the console in dev tools of our browswer that the form has been submited
                console.log("Form has been submitted.");

                //Opens modal box using the jQuery modal plug in which closes upon being clicked outside the box
                $('#myModal').modal();
                //Displays the message in the modal box with the string followed by the string values of the title and name given by user
                $("#myModal").html("Thank you for your payment, " + titleOutput + " " + setName)
            }

        });
    });

    App.FormHandler = FormHandler;
    window.App = App;
})(window);