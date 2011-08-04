

//Reindex function/Plugin 
jQuery.fn.Reindex = function(item, displayTag) {
    item = item || "li";
    displayTag = displayTag || "span";
    $(this).find(item).each(function(i) {
        $(this).find(displayTag).text(i + 1);
    });
};

$(document).ready(function() {

    $("#addJotFields").hide();
    $("#tasks").Reindex();

    //Sort Task Items
    $("#tasks").sortable({
        stop: function(event, ui) { $("#tasks").Reindex(); }
    });
	

		$( "#registerLink" )
			.click(function() {
				$( "#register-form" ).dialog( "open" );
			});

		$( "#loginLink" )
			.click(function() {
				$( "#login-form" ).dialog( "open" );
			});
 

	$( "#register-form" ).dialog({
			autoOpen: false,
			height: 300,
			width: 300,
			modal: true,
			buttons: {
				"Register": function() {
					
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			},
			close: function() {
				allFields.val( "" ).removeClass( "ui-state-error" );
			}
		});


	$( "#login-form" ).dialog({
			autoOpen: false,
			height: 270,
			width: 300,
			modal: true,
			buttons: {
				"Login": function() {
					
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			},
			close: function() {
				allFields.val( "" ).removeClass( "ui-state-error" );
			}
		});


    //Not required , but disables selection of text since we are draggind and sorting
    $("#tasks").disableSelection();

    //if you need to save data to heml elements 
    $("#trash").data('count', 0);

    //using the droppable plugin for simulating the delete
    $("#trash").droppable({
        over: function(event, ui) {
            ui.draggable
             .fadeOut('slow', function() {
                 $("#trashList").append(ui.draggable);
                 $("#tasks").Reindex();
             });

            $("#trash").attr('src', 'images/fullCan.png');
            $("#trash").data('count', $("#trash").data('count') + 1);

        },
        drop: function(event, ui) {
        }
    });

    //restore button to restore from trashlist unordered list to tasks unordered list
    $("#restoreIcon").click(function() {
        $("#trashList li").each(function(index, li) {
            $("#tasks").append(li);
            $(li).show();
        });

        $("#trash").attr('src', 'images/emptyCan.png');
        $("#trash").data('count', 0);

        $("#tasks").Reindex();
    });

    //sliding the add/edit panel
    $("#slide").click(function() {
        $("#addJotFields").toggle('slow', function() {
            $("#slide").toggleClass("slideClose");
        });

    });

    //handle the cancel of the add/edit
    $("#cancelButton").click(function() {
        $("#addJotFields").hide('slow');
        $("#slide").toggleClass("slideClose");
    });

    //Validation using the Jquery Validate Plugin
    //overiding the options to display a bubble message instead of the default span 
    // offsetting based on the element position - setting left and top of the message container
    $("#addForm").validate({
        errorElement: "div",
        wrapper: "div",  // a wrapper around the error message
        errorPlacement: function(error, element) {
            offset = element.offset();
            divoffset = $("#addJotFields").offset();
            error.insertBefore(element)
            error.addClass('message');  // add a class to the wrapper
            error.css('left', offset.left - divoffset.left + 100);
            error.css('top', offset.top - element.outerHeight() - divoffset.top + 10);
        }
    });
    
    //handle the add - validation prior to adding a task
    $("#addButton").click(function() {

        if ($("#addForm").valid()) {

            $("#tasks").append("<li><span></span><h3>" + $('#title').val() + "</h3><img src='images/edit.gif' /><p>" + $('#description').val() + "</p></li>");
            $("#tasks").Reindex();
            $('#tasks li:last').fadeOut('slow').fadeIn('slow');
            $("html, body").animate({ scrollTop: $(document).height() }, 10);
            $("#addJotFields").hide('slow', function() { $("#slide").toggleClass("slideClose"); });
        }
    });

     //JQuery UI for adding datepicker for the date fields 
    $("#startDate,#endDate").datepicker();
    //JQuery UI for adding button behvior  for the add and cancel links
    $("#addButton,#cancelButton").button()

    //using the live plugin for attaching the click event to static and the dynamically added tasks
    $("#tasks li img").live('click', function() {
        $("input").val('');
        $('#title').val($(this).parent().find("h3").text());
        $('#description').val($(this).parent().find("p").text());
        $(this).parent().fadeOut('slow').fadeIn('slow');
        $("#addJotFields").show('slide', { direction: 'right' }, function() { $("#slide").toggleClass("slideOpen"); });
    });

});

function Reindex() {
    $("#tasks li").each(function(i) {
        $(this).find("span").text(i + 1);
    });
}


/// Handling dynamic CSS file usage  


