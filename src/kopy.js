/*!
 * kopy.js 0.1.0
 * Rival Arya
 * https://github.com/rifalarya-2/kopy.js
 */
var element = $('.kopy');

if (element.length !== 0) {

    $('body').before(`
            <style>
                .kopy.canbecopied {
                    cursor: pointer;
                    background: linear-gradient(to left, transparent 50%, yellow 50%);
                    background-size: 200%;
                    background-position: right;
                    transition: background-position 0.5s ease-in-out;
                    display: inline;
                }
    
                .kopy.canbecopied:hover {
                    color: black;
                    background-position: left;
                }
    
                .kopyTooltip {
                    margin: 8px;
                    padding: 3px;
                    border-radius: 10px;
                    background-color: grey;
                    position: absolute;
                    z-index: 999;
                    color: black;
                    box-shadow: -1px -1px 13px #aaa;
                }
            </style>`);

    element.map((i, val) => {

        var showTooltip = function(event) {
            if ($('.kopyTooltip').length === 0) {
                $('<div class="kopyTooltip">Klik untuk menyalin</div>').appendTo('body');
            } else {
                $('.kopyTooltip').text('Disalin');
            }
            changeTooltipPosition(event);
            setTimeout(() => {
                hideTooltip();
            }, 4000);
        };

        var changeTooltipPosition = function(event) {
            try {
                var tooltipX = event.pageX - 8;
                var tooltipY = event.pageY + 8;
                $('div.kopyTooltip').css({
                    top: tooltipY,
                    left: tooltipX
                });
            } catch (err) {

            }
        };

        var hideTooltip = function() {
            $('div.kopyTooltip').remove();
        };

        if (val.dataset.kopyText !== '' && val.dataset.kopyText !== undefined) {

            $(val).addClass('canbecopied');
            $(val).prev().css('display', 'block');
            $(val).bind({
                mousemove: changeTooltipPosition,
                mouseenter: showTooltip,
                mouseleave: hideTooltip,
                click: showTooltip
            });

            $(val).click(() => {
                try {
                    navigator.clipboard.writeText(val.dataset.kopyText).then(res => {
                        showTooltip();
                    })
                } catch (err) {
                    alert('Tidak bisa menyalin teks');
                    console.error(err);
                }
            })
        }

    })

}