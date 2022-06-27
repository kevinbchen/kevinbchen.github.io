var next_element = null;
var prev_element = null;

function set_gallery(el) {
    next_element = null;
    prev_element = null;
    var next = document.getElementById('lightbox_next');
    var prev = document.getElementById('lightbox_prev');
    var visibility = "hidden";
    var gallery = el.closest('.gallery');
    if (gallery) {
        var link_elements = gallery.querySelectorAll("a[class*='lightbox-']");
        var n = link_elements.length;
        if (n > 1) {
            var index = 0;
            link_elements.forEach((link_element, i) => {
                if (el == link_element) {
                    index = i;
                }
            });
            next_element = link_elements[(index + 1) % n];
            prev_element = link_elements[((index - 1) + n) % n];
            visibility = "visible";
        }
    }
    next.style.visibility = visibility;
    prev.style.visibility = visibility;
}

document.addEventListener("DOMContentLoaded", function() {
    var on_prev = () => {
        if (prev_element) prev_element.click();
    }
    var on_next = () => {
        if (next_element) next_element.click();
    }
    var on_esc = () => {
        document.getElementById('lightbox').style.display = 'none';
        var img = document.getElementById('lightbox_img');
        if (img.firstChild) {
            img.removeChild(img.firstChild);
        }
        document.getElementById('lightbox_next').style.visibility = 'hidden';
        document.getElementById('lightbox_prev').style.visibility = 'hidden';
        next_element = null;
        prev_element = null;
    }

    document.getElementById('lightbox').addEventListener("click", function(event) {
        if (event.target.id == 'lightbox_next') {
            on_next();
        } else if (event.target.id == 'lightbox_prev') {
            on_prev();
        } else {
            on_esc();
        }
    });
    document.addEventListener('keydown', function(event) {
        if (event.defaultPrevented) {
            return;
        }
        if (event.key == "ArrowRight") {
            on_next();
        } else if (event.key == "ArrowLeft") {
            on_prev();
        } else if (event.key == "Esc" || event.key == "Escape") {
            on_esc();
        }
    });

    var elements = document.querySelectorAll('a.lightbox-image');
    elements.forEach(element => {
        element.addEventListener("click", function(event) {
            event.preventDefault();
            document.getElementById('lightbox_loading').style.visibility = 'visible';
            document.getElementById('lightbox').style.display = 'block';
            set_gallery(this);

            var img = document.createElement('img');
            img.addEventListener("load", function(event) {
                document.getElementById('lightbox_img').replaceChildren(this);
                document.getElementById('lightbox_loading').style.visibility = 'hidden';
            });
            img.src = this.getAttribute('href');
            img.alt = this.getAttribute('title');
        });
    });
});