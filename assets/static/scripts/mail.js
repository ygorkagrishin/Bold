$(document).ready(function () {

    $('#form').on('submit', function (e) {
        e.preventDefault();

        var self = $(this),
            url = self.attr('action'),
            method = self.attr('method'),
            data = self.serialize();

        $.ajax({
            type: method,
            url: url,
            data: data,
            success: function () {
                self.trigger('reset');
            }
        });
    });

});