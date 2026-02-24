/* add code for progress bar so as user scrolls the progress bar increases in size*/
window.addEventListener("scroll", function () {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight);
    const maxBarHeight = this.window.innerHeight * 0.8;
    const progressBar = document.getElementById("progress-bar");
    progressBar.style.height = (scrollPercent * maxBarHeight) + "px";
});

/*scrollama code */

        /* initialize variables */
        var container = d3.select("#scroll");
        var figure = container.select("figure");
        var article = container.select("article");
        var step = article.selectAll(".step");
        /* call function scrollama */
        var scroller = scrollama();

        /* fix height of step and figure elements */
        function handleResize() {
            var stepHeight = Math.floor(window.innerHeight * 0.75);
            step.style("height", stepHeight + "px");

            var figureHeight = Math.floor(window.innerHeight * 0.5);
            figure.style("height", figureHeight + "px");

            scroller.resize();
        }

        /* create array of media objects for each step's media element, minus the first one since it's a youtube video */
        var media = [
            {
                type: "img",
                src: "white.jpeg",
                link: "https://jour390.my.canva.site/wind-data-story-animation",
                alt: "Thumbnail for sports news feature that links to site"
            },
            {
                type: "img",
                src: "white.jpeg",
                link: "https://northbynorthwestern.com/how-the-2024-election-results-could-affect-the-future-of-northwestern-athletics-part-1/",
                alt: "Thumbnail for sports news feature that links to site"
            }
        ];

        /* define what happens when step is entered */
        function handleStepEnter(response) {
            step.classed("is-active", (d, i) => i === response.index);
            
            // do nothing for step 0 since youtube video link is on html page itself
            if (response.index === 0) {
                d3.select("#scrolly-figure").html(`
                    <img src="white.jpeg" alt="Documentary link"> `);
                    return;
                }

            //start switching out the figure for steps 1-3, not step 0
            var item = media[response.index - 1];

            d3.select("#scrolly-figure").html("");

            // if it's an image, load the image
            if (item.type === "img") {
                d3.select("#scrolly-figure").html(`
                    <div class="media-box">
                        <a href="${item.link}" target="_blank">
                            <img src="${item.src}" class="scrolly-media" alt="${item.alt}">
                        </a>
                    </div>
                `);
            }

        }

         

        /* create the scroller */
        function init() {
            handleResize();

            scroller
                .setup({
                    step: "article .step",
                    offset: 0.75
                })
                .onStepEnter(handleStepEnter);

            window.addEventListener("resize", handleResize);
        }

        init();