"use strict";
window.onload = function() {
    var sp = getSpotifyApi();
    var models = sp.require('$api/models');
    var views = sp.require('$api/views');

    var activeStandard, activeVariation;

    var standardsArray = {
        letters: [
            {
                "label": "0",
                "standards": [{"title":"12th Street Rag"},{"title":"52nd Street Theme"},{"title":"9:20 Special"}]
            },
            {
                "label": "A",
                "standards": [{"title":"An Affair to Remember"},{"title":"Afro Blue"},{"title":"After Hours"},{"title":"After I Say I'm Sorry"},{"title":"After You've Gone"},{"title":"Afternoon in Paris"},{"title":"Air Mail Special"},{"title":"Ain't Misbehavin'"},{"title":"Ain't Nobody's Business"},{"title":"Ain't She Sweet"},{"title":"Airegin"},{"title":"Alexander's Ragtime Band"},{"title":"Alfie"},{"title":"Algo Bueno"},{"title":"All Alone"},{"title":"All Blues"},{"title":"All By Myself"},{"title":"All God's Chillun Got Rhythm"},{"title":"All My Life"},{"title":"All of Me"},{"title":"All of You"},{"title":"All or Nothing At All"},{"title":"All the Clouds'll Roll Away"},{"title":"All the Things You Are"},{"title":"All the Way"},{"title":"All Through the Night"},{"title":"All Too Soon"},{"title":"Allen's Alley"},{"title":"Almost Like Being in Love"},{"title":"Alone Together"},{"title":"Always"},{"title":"Am I Blue?"},{"title":"Amazing Grace"},{"title":"And the Angels Sing"},{"title":"And Her Tears Flowed Like Wine"},{"title":"Angel Eyes"},{"title":"Anthropology"},{"title":"Any Old Time"},{"title":"Anything for You"},{"title":"Anything Goes"},{"title":"April in Paris"},{"title":"Aquellos Ojos Verdes"},{"title":"As Long As I Have You"},{"title":"As Long as I Live"},{"title":"As Time Goes By"},{"title":"Ask Me Now"},{"title":"At Last"},{"title":"At Long Last Love"},{"title":"At Sundown"},{"title":"At the Jazz Band Ball"},{"title":"A-Tisket, A-Tasket"},{"title":"Au Privave"},{"title":"Auld Lang Syne"},{"title":"Aunt Hagar's Blues"},{"title":"Autumn Leaves"},{"title":"Autumn in New York"},{"title":"Avalon"},{"title":"Away in a Manger"},{"title":"Azure"}]
            },
            {
                "label": "B",
                "standards": [{"title":"Baby Won't You Please Come Home"},{"title":"Back Home Again in Indiana"},{"title":"Back in Your Own Backyard"},{"title":"Back Water Blues"},{"title":"Bad and the Beautiful"},{"title":"Bags' Groove"},{"title":"Bahia"},{"title":"The Ballad of Mack the Knife"},{"title":"Ballin' the Jack"},{"title":"Barbados"},{"title":"Basin Street Blues"},{"title":"Baubles, Bangles and Beads"},{"title":"Beale Street Blues"},{"title":"Beautiful Love"},{"title":"Bedouin"},{"title":"Begin the Beguine"},{"title":"Bei Mir Bist Du Schoen"},{"title":"Bemsha Swing"},{"title":"Be-Bop"},{"title":"Be My Love"},{"title":"Bernie's Tune"},{"title":"Besame Mucho"},{"title":"Bess, You Is My Woman Now"},{"title":"The Best Is Yet to Come"},{"title":"The Best Thing for You"},{"title":"The Best Things in Life Are Free"},{"title":"Between the Devil and the Deep Blue Sea"},{"title":"Bewitched, Bothered, and Bewildered"},{"title":"Big Butter and Egg Man"},{"title":"Big Foot"},{"title":"Bill Bailey, Won't You Please Come Home"},{"title":"Billie's Bounce"},{"title":"Birk's Works"},{"title":"The Birth of the Blues"},{"title":"Bird Gets the Worm"},{"title":"Birdland"},{"title":"Black and Blue"},{"title":"Black and Tan Fantasy"},{"title":"Black Coffee"},{"title":"Blame It on My Youth"},{"title":"Blood Count"},{"title":"Bloomdido"},{"title":"Blue and Sentimental"},{"title":"Blue Bossa"},{"title":"Blues for Alice"},{"title":"Blue in Green"},{"title":"Blue Lou"},{"title":"Blue Monk"},{"title":"Blue Moon"},{"title":"Blue 'N' Boogie"},{"title":"Blue Rondo à la Turk"},{"title":"Blue Room"},{"title":"Blue Skies"},{"title":"Bluesette"},{"title":"Blue Train"},{"title":"Blue Turning Grey Over You"},{"title":"Blueberry Hill"},{"title":"Blues in My Heart"},{"title":"Blues in the Closet"},{"title":"Blues in the Night"},{"title":"Body and Soul"},{"title":"Bohemia After Dark"},{"title":"Born to Be Blue"},{"title":"Bouncin' with Bud"},{"title":"Brazil"},{"title":"The Breeze and I"},{"title":"Broadway"},{"title":"Bugle Call Rag"},{"title":"But Beautiful"},{"title":"But Not for Me"},{"title":"By Myself"},{"title":"Bye Bye Blackbird"},{"title":"Bye Bye Blues"}]
            },
            {
                "label": "C",
                "standards": [{"title":"C Jam Blues"},{"title":"Cabin in the Sky"},{"title":"Canadian Sunset"},{"title":"Candy"},{"title":"Can't Help Lovin' Dat Gal"},{"title":"Can't Help Lovin' Dat Man"},{"title":"Can't We Be Friends"},{"title":"Caravan"},{"title":"Careless Love"},{"title":"Carioca"},{"title":"Centerpiece"},{"title":"Chameleon"},{"title":"Change Partners"},{"title":"Charleston"},{"title":"Chasin' the Bird"},{"title":"Chattanooga Choo Choo"},{"title":"Cheek to Cheek"},{"title":"Chelsea Bridge"},{"title":"Cherokee"},{"title":"Cherry"},{"title":"Cheryl"},{"title":"Chestnuts Roasting on an Open Fire"},{"title":"Chicago (That Toddlin' Town)"},{"title":"A Child Is Born"},{"title":"China Boy"},{"title":"Chinatown My Chinatown"},{"title":"Chloe"},{"title":"The Christmas Song"},{"title":"Christmas Time is Here"},{"title":"Christopher Columbus"},{"title":"Close Enough for Love"},{"title":"Close Your Eyes"},{"title":"Cocktails for Two"},{"title":"Come Rain or Come Shine"},{"title":"Come Sunday"},{"title":"Comes Love"},{"title":"Con Alma"},{"title":"Conception"},{"title":"Confessin'"},{"title":"Confirmation"},{"title":"The Continental"},{"title":"Coquette"},{"title":"Corcovado (Quiet Nights of Quiet Stars)"},{"title":"Corner Pocket"},{"title":"A Cottage for Sale"},{"title":"Cotton Tail"},{"title":"Crazy He Calls Me"},{"title":"Crazy Rhythm"},{"title":"Creole Love Call"},{"title":"Cry Me a River"}]
            },
            {
                "label": "D",
                "standards": [{"title":"Daahoud"},{"title":"Darktown Strutters' Ball"},{"title":"Dancing in the Dark"},{"title":"Dancing on the Ceiling"},{"title":"Danny Boy"},{"title":"Dark Eyes"},{"title":"Darn That Dream"},{"title":"Davenport Blues"},{"title":"Day by Day"},{"title":"Day Dream"},{"title":"Day In, Day Out"},{"title":"Days of Wine and Roses"},{"title":"Dear Old Southland"},{"title":"Dear Old Stockholm"},{"title":"Dedicated to You"},{"title":"Dearly Beloved"},{"title":"'Deed I Do"},{"title":"Deep in a Dream"},{"title":"Deep Night"},{"title":"Deep Purple"},{"title":"Deep River"},{"title":"Desafinado"},{"title":"Detour Ahead"},{"title":"Dexterity"},{"title":"Dinah"},{"title":"Dindi"},{"title":"Dipper Mouth Blues"},{"title":"Dizzy Atmosphere"},{"title":"Dizzy's Business"},{"title":"Django"},{"title":"Do It Again"},{"title":"Do Nothin' Till You Hear from Me"},{"title":"Do You Know What It Means to Miss New Orleans"},{"title":"Doggin' Around"},{"title":"Dolphin Dance"},{"title":"Donna Lee"},{"title":"Don't Be That Way"},{"title":"Don't Blame Me"},{"title":"Don't Explain"},{"title":"Don't Get Around Much Anymore"},{"title":"Don't Go to Strangers"},{"title":"Don't Take Your Love from Me"},{"title":"Don't Worry About Me"},{"title":"Don't Worry 'Bout Me"},{"title":"Don't You Know I Care?"},{"title":"Doxy"},{"title":"Dream"},{"title":"Dream Dancing"},{"title":"Dream of You"},{"title":"Drifting on a Reed"},{"title":"Drop Me Off in Harlem"},{"title":"The Duke"},{"title":"Duke's Place"}]
            },
            {
                "label": "E",
                "standards": [{"title":"Early Autumn"},{"title":"East of the Sun (and West of the Moon)"},{"title":"Easter Parade"},{"title":"Easy Does It"},{"title":"Easy Living"},{"title":"Easy to Love"},{"title":"Echoes of Harlem"},{"title":"El Manicero"},{"title":"El Manisero"},{"title":"Embraceable You"},{"title":"Emily"},{"title":"The End of a Love Affair"},{"title":"Epistrophy"},{"title":"Equinox"},{"title":"Estate"},{"title":"Every Day I Have the Blues"},{"title":"Ev'ry Time We Say Goodbye"},{"title":"Every Tub"},{"title":"Everybody Loves My Baby"},{"title":"Everything but You"},{"title":"Everything Happens to Me"},{"title":"Everything I Have Is Yours"},{"title":"Ev'rything I Love"},{"title":"Everything I've Got (Belongs to You)"},{"title":"Everything Must Change"},{"title":"Evidence"},{"title":"Ev'ry Time We Say Goodbye"},{"title":"Ev'rything I've Got (Belongs to You)"},{"title":"Exactly Like You"},{"title":"Exodus"}]
            },
            {
                "label": "F",
                "standards": [{"title":"Falling in Love with Love"},{"title":"Farewell Blues"},{"title":"Fascinating Rhythm"},{"title":"Fat Girl"},{"title":"A Felicidade"},{"title":"Fever"},{"title":"Fidgety Feet"},{"title":"Fine and Dandy"},{"title":"Fine and Mellow"},{"title":"A Fine Romance"},{"title":"Five O'clock Whistle"},{"title":"Flamingo"},{"title":"The Flat Foot Floogie"},{"title":"A Flower Is a Lovesome Thing"},{"title":"Flying Home"},{"title":"A Foggy Day"},{"title":"A Foggy Day in London Town"},{"title":"The Folks Who Live On the Hill"},{"title":"Fools Rush In (Where Angels Fear to Tread)"},{"title":"Footprints"},{"title":"For All We Know"},{"title":"For Heaven's Sake"},{"title":"For Sentimental Reasons"},{"title":"For You"},{"title":"Four"},{"title":"Four Brothers"},{"title":"Four or Five Times"},{"title":"Frankie and Johnny"},{"title":"Freddie Freeloader"},{"title":"Freedom Jazz Dance"},{"title":"Frenesi"},{"title":"From This Moment On"},{"title":"A Gal in Calico"}]
            },
            {
                "label": "G",
                "standards": [{"title":"Gee Baby Ain't I Good to You"},{"title":"Georgia on My Mind"},{"title":"Get Happy"},{"title":"Get Out of Town"},{"title":"Get Your Kicks on Route 66"},{"title":"Ghost of a Chance"},{"title":"Giant Steps"},{"title":"The Girl from Ipanema"},{"title":"Girl Talk"},{"title":"Glad to Be Unhappy"},{"title":"Gloomy Sunday"},{"title":"The Glory of Love"},{"title":"God Bless the Child"},{"title":"God Rest Ye Merry Gentlemen"},{"title":"Goin' Out of My Head"},{"title":"Goin' to Chicago Blues"},{"title":"Going to Chicago"},{"title":"Gone with the Wind"},{"title":"Good Bait"},{"title":"The Good Life"},{"title":"Good Morning Heartache"},{"title":"Goodbye"},{"title":"Goodbye Pork Pie Hat"},{"title":"Goodnight My Love"},{"title":"Green Eyes (Aquellos Ojos Verdes)"},{"title":"Greensleeves"},{"title":"Groovin' High"},{"title":"Guilty"}]
            },
            {
                "label": "H",
                "standards": [{"title":"Half Nelson"},{"title":"Hallelujah"},{"title":"Happiness Is a Thing Called Joe"},{"title":"Hard Hearted Hannah"},{"title":"Harlem Nocturne"},{"title":"Harvard Blues"},{"title":"Haunted Heart"},{"title":"Have You Met Miss Jones?"},{"title":"Have Yourself a Merry Little Christmas"},{"title":"Havin' a Heat Wave"},{"title":"Heart and Soul"},{"title":"Heat Wave"},{"title":"Hello, Dolly!"},{"title":"Hello Young Lovers"},{"title":"Here's That Rainy Day"},{"title":"He's Funny That Way"},{"title":"Hey Little Girl"},{"title":"Hi Fly"},{"title":"High Society"},{"title":"Honeysuckle Rose"},{"title":"The Hour of Parting"},{"title":"Hot House"},{"title":"A House Is Not a Home"},{"title":"How About You"},{"title":"How Am I to Know?"},{"title":"How Come You Do Me Like You Do?"},{"title":"How Deep Is the Ocean?"},{"title":"How High the Moon"},{"title":"How Insensitive"},{"title":"How Long Blues"},{"title":"How Long Has This Been Going On?"},{"title":"Humoresque"}]
            },
            {
                "label": "I",
                "standards": [{"title":"I Ain't Got Nobody"},{"title":"I Ain't Got Nothin' But the Blues"},{"title":"I Can't Get Started"},{"title":"I Cover the Waterfront (song)"},{"title":"I Didn't Know About You"},{"title":"I Didn't Know What Time It Was"},{"title":"I Don't Stand a Ghost of a Chance with You"},{"title":"I Don't Want You to Go"},{"title":"I Fall in Love Too Easily"},{"title":"I'm Getting Sentimental Over You"},{"title":"I Got Rhythm"},{"title":"I Happen to Like New York"},{"title":"I'll Remember April"},{"title":"I Love You (Cole Porter song)"},{"title":"I Remember Clifford"},{"title":"I Remember You"},{"title":"I Should Care"},{"title":"I Surrender Dear"},{"title":"I Thought About You"},{"title":"If I Could Be with You (One Hour Tonight)"},{"title":"If I Had You"},{"title":"If Love Were All"},{"title":"If You Could See Me Now"},{"title":"I'm Just a Lucky So-and-So"},{"title":"Impressions"},{"title":"In a Mellow Tone"},{"title":"In a Mist"},{"title":"In a Sentimental Mood"},{"title":"In the Groove"},{"title":"In the Mood"},{"title":"In Walked Bud"},{"title":"In Your Own Sweet Way"},{"title":"Isfahan (song)"},{"title":"It Don't Mean a Thing"},{"title":"It's Easy to Remember (And So Hard to Forget)"},{"title":"It's Only a Paper Moon"},{"title":"I've Found a New Baby"}]
            },
            {
                "label": "J",
                "standards": [{"title":"Ja-Da"},{"title":"Jordu"},{"title":"Joy Spring"},{"title":"Just A-Sittin' and A-Rockin'"},{"title":"Just Friends"},{"title":"Just One of Those Things"},{"title":"Just Squeeze Me (But Please Don't Tease Me)"},{"title":"Just You, Just Me"}]
            },
            {
                "label": "K",
                "standards": [{"title":"King Porter Stomp"},{"title":"Ko-Ko"}]
            },
            {
                "label": "L",
                "standards": [{"title":"Ladybird"},{"title":"Last Recordings"},{"title":"(Up A) Lazy River"},{"title":"Limehouse Blues"},{"title":"Linus and Lucy"},{"title":"Li'l Liza Jane"},{"title":"Liza (All the Clouds'll Roll Away)"},{"title":"Lonely Woman"},{"title":"Love for Sale"},{"title":"Love Is Here to Stay"},{"title":"Lover, Come Back to Me"},{"title":"Lover Man (Oh, Where Can You Be?)"},{"title":"Lullaby of Birdland"},{"title":"Lush Life"}]
            },
            {
                "label": "M",
                "standards": [{"title":"Mack the Knife"},{"title":"Mahjong"},{"title":"Maiden Voyage"},{"title":"The Man I Love"},{"title":"Margie"},{"title":"Mean to Me"},{"title":"Memories of You"},{"title":"The Memphis Blues"},{"title":"Mercy, Mercy, Mercy"},{"title":"Mi Burrito"},{"title":"Michelle"},{"title":"Milestones"},{"title":"Minor Swing"},{"title":"Misty"},{"title":"Moanin' Low"},{"title":"Moment's Notice"},{"title":"Mood Indigo"},{"title":"Moody's Mood for Love"},{"title":"Moonglow"},{"title":"Moon River"},{"title":"Moose the Mooche"},{"title":"More Than You Know"},{"title":"Muskrat Ramble"},{"title":"My Foolish Heart"},{"title":"My Funny Valentine"},{"title":"My Romance"}]
            },
            {
                "label": "N",
                "standards": [{"title":"Nagasaki"},{"title":"Naima"},{"title":"Nancy (With the Laughing Face)"},{"title":"Nature Boy"},{"title":"The Nearness of You"},{"title":"Nem Um Talvez"},{"title":"New Orleans"},{"title":"Nica's Dream"},{"title":"Night and Day"},{"title":"Night Train"},{"title":"The Night Has a Thousand Eyes"},{"title":"A Night in Tunisia"},{"title":"Nobody Else But Me"},{"title":"Now's the Time"}]
            },
            {
                "label": "O",
                "standards": [{"title":"Oh, Lady Be Good!"},{"title":"Oleo"},{"title":"On Green Dolphin Street"},{"title":"On the Sunny Side of the Street"},{"title":"Once in a While"},{"title":"One Morning in May"},{"title":"One O'Clock Jump"},{"title":"Opus de Funk"},{"title":"Ornithology"},{"title":"Our Delight"},{"title":"Out of Nowhere"},{"title":"Over the Rainbow"}]
            },
            {
                "label": "P",
                "standards": [{"title":"Peace Piece"},{"title":"Pennies from Heaven"},{"title":"Perdido"},{"title":"Petite Fleur"},{"title":"Polka Dots and Moonbeams"},{"title":"Prelude to a Kiss"},{"title":"P.S. I Love You"}]
            },
            {
                "label": "Q",
                "standards": []
            },
            {
                "label": "R",
                "standards": [{"title":"Rhythm changes"},{"title":"Riverboat Shuffle"},{"title":"Rockin' Chair"},{"title":"Rocks in My Bed"},{"title":"Rose Room"},{"title":"'Round Midnight"},{"title":"Royal Garden Blues"}]
            },
            {
                "label": "S",
                "standards": [{"title":"'S Wonderful"},{"title":"Salt Peanuts"},{"title":"Satin Doll"},{"title":"Scrapple from the Apple"},{"title":"See See Rider"},{"title":"September Song"},{"title":"Send in the Clowns"},{"title":"The Sheik of Araby"},{"title":"Since I Fell for You"},{"title":"Sing for Your Supper"},{"title":"Sing, Sing, Sing (With a Swing)"},{"title":"A Sleepin' Bee"},{"title":"Smoke Gets in Your Eyes"},{"title":"Softly, as in a Morning Sunrise"},{"title":"Solar"},{"title":"(In My) Solitude"},{"title":"Somebody Loves Me"},{"title":"Some Day My Prince Will Come"},{"title":"Some of These Days"},{"title":"Someday Sweetheart"},{"title":"Someone to Watch Over Me"},{"title":"Something to Live For"},{"title":"Sophisticated Lady"},{"title":"So What"},{"title":"Spain"},{"title":"Speak Low"},{"title":"Spring Can Really Hang You Up The Most"},{"title":"Squeeze Me"},{"title":"St. Louis Blues"},{"title":"St. Thomas"},{"title":"Stairway to the Stars"},{"title":"Stardust"},{"title":"Stars Fell on Alabama"},{"title":"Stella by Starlight"},{"title":"Stolen Moments"},{"title":"Straight, No Chaser"},{"title":"Stompin' at the Savoy"},{"title":"Sugar"},{"title":"Summertime"},{"title":"The Surrey with the Fringe on Top"},{"title":"Sweet Georgia Brown"},{"title":"Sweet Lorraine"}]
            },
            {
                "label": "T",
                "standards": [{"title":"Take Five"},{"title":"Take the \"A\" Train"},{"title":"Tea for Two"},{"title":"Tenderly"},{"title":"That's All"},{"title":"That's a Plenty"},{"title":"There's a Small Hotel"},{"title":"There Is No Greater Love"},{"title":"There Must Be Somebody Else"},{"title":"These Foolish Things (Remind Me of You)"},{"title":"There Will Never Be Another You"},{"title":"They Can't Take That Away from Me"},{"title":"They Didn't Believe Me"},{"title":"Things Ain't What They Used to Be"},{"title":"The Things We Did Last Summer"},{"title":"The Trolley Song"},{"title":"Tiger Rag"},{"title":"Till There Was You"},{"title":"Tin Roof Blues"},{"title":"Twelfth Street Rag"},{"title":"The Two Lonely People"}]
            },
            {
                "label": "U",
                "standards": []
            },
            {
                "label": "V",
                "standards": []
            },
            {
                "label": "W",
                "standards": [{"title":"Walkin' Shoes"},{"title":"Waltz for Debby"},{"title":"Watermelon Man"},{"title":"The Way You Look Tonight"},{"title":"Weary Blues"},{"title":"Well, You Needn't"},{"title":"What a Little Moonlight Can Do"},{"title":"Whatever Lola Wants"},{"title":"What Is This Thing Called Love?"},{"title":"What's New?"},{"title":"When It's Sleepy Time Down South"},{"title":"When My Sugar Walks Down the Street"},{"title":"When You Wish Upon a Star"},{"title":"When Your Lover Has Gone"},{"title":"Why Don't You Do Right?"},{"title":"Wild Women Don't Have the Blues"},{"title":"Willow Weep for Me"},{"title":"Witchcraft"},{"title":"Won't You Come Home Bill Bailey"},{"title":"Woodchopper's Ball"},{"title":"Woody N' You"},{"title":"The World Is Waiting for the Sunrise"}]
            },
            {
                "label": "X",
                "standards": []
            },
            {
                "label": "Y",
                "standards": [{"title":"Yardbird Suite"},{"title":"Yesterdays"},{"title":"You and the Night and the Music"},{"title":"You Don't Know What Love Is"},{"title":"You Go to My Head"},{"title":"Young and Foolish"}] 
            },
            {
                "label": "Z",
                "standards": []
            },
        ]
    }

    function renderStandards() {
        var template = $('#template-standards').html();
        $('#standards-list').html(Mustache.to_html(template, standardsArray));
    }

    function getKey(key, mode) {
        var keys = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
        var modes = ["minor", "major"]
        return keys[key] + " " + modes[mode];
    }

    function tabs() {
        var args = models.application.arguments;
        var current = document.getElementById((args && args.length > 0) ? args[0] : 'index');
        var sections = document.getElementsByClassName('section');
        for (var i=0, l = sections.length; i<l; i++) {
            if (current != sections[i]) {
                sections[i].style.display = 'none';
            }
        }
        current.style.display = 'block';
    }

    var View = function () {
        function _hideAll() {
            var views = document.getElementsByClassName('view');
            for (var i=0, l = views.length; i<l; i++) {
                views[i].style.display = 'none';
            }
        }

        var _loading = [], current = 0;
        function _animateLoader() {
            if (_loading.is(':visible')) {
                current = (current + 1) % 12;
                _loading.css({'backgroundPosition': current * 30 });
                setTimeout(_animateLoader, 80);
            }
        }
        function _startLoaders() {
            _loading = $('.loading:visible');
            _animateLoader();
        }

        function _show(id) {
            _hideAll();
            document.getElementById(id).style.display = 'block';
            _startLoaders();
        }

        var _songCache;
        function _getCachedSong(id) {
            if (_songCache) {
                for (var i = 0; i < _songCache.length; i++) {
                    if (_songCache[i].id == id) {
                        return _songCache[i];
                    }
                }
            }
            return null;
        }

        function _visualize(data, elem, color) {
            var n = 1, // number of layers
                m = data.segments.length, // number of samples per layer
                stack = d3.layout.stack().offset("wiggle"),
                layers0 = stack([getMax(data.segments)]);
                //layers1 = stack([getMin(data.segments)]);

            var width = $(elem).width(),
                height = 150;

            var x = d3.scale.linear()
                .domain([0, m - 1])
                .range([0, width]);

            var y = d3.scale.linear()
            //    .domain([0, d3.max(layers0.concat(layers1), function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); })])
                .domain([0, d3.max(layers0, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); })])
                .range([height, 0]);

            var color = d3.scale.linear()
                .range([color, color]);

            var area = d3.svg.area()
                .x(function(d) { return x(d.x); })
                .y0(function(d) { return y(d.y0); })
                .y1(function(d) { return y(d.y0 + d.y); });

            var svg = d3.select(elem).append("svg")
                .attr("width", width)
                .attr("height", height);

            svg.selectAll("path")
                .data(layers0)
              .enter().append("path")
                .attr("d", area)
                .style("fill", function() { return color(Math.random()); });

            function getMin(segments) {
                var res = [];
                for (var i = 0; i < segments.length; i++) {
                    res.push({
                        x: i,
                        y: (segments[i].loudness_start + 100) / 100
                    });
                }
                return res;
            }
            function getMax(segments) {
                var res = [],
                    duration = 0, loudness_min = 0;
                for (var i = 0; i < segments.length; i++) {
                    duration += segments[i].duration;
                    loudness_min = loudness_min < (segments[i].loudness_max + 130) ? (segments[i].loudness_max + 130) : loudness_min;
                }

                for (var i = 0; i < segments.length; i++) {
                    res.push({
                        x: segments[i].start / duration * segments.length,
                        y: segments[i].loudness_max + loudness_min
                    });
                }
                return res;
            } 
        }

        return {
            start: function () {
                _songCache = null;
                _show('start');
            },
            title: function (title) {
                _show('loading');
                activeStandard = title;
                EchoNest.search({title: title}, function (songs) {
                    _songCache = songs;
                    _show('title');
                    var template = $('#template-title').html();
                    $('#title').html(Mustache.to_html(template, {
                        search: title,
                        songs: _songCache
                    }));
                    $("#variations-table").tablesorter();
                });
            },

            variation: function(id) {
                _show('loading');
                var song = _getCachedSong(id), t, totalTracks = 0;

                var render = function (song) {
                    _show('variation');
                    var template = $('#template-variation').html();
                    $('#variation').html(Mustache.to_html(template, {
                        activeStandard: activeStandard,
                        activeVariation: id,
                        song: song
                    }));
                    var list = new views.List(song.collection);
                    list.node.classList.add("sp-light");

                    var img = new views.Image(song.collection.get(0).album.image);
                    $('#coverArt').html();
                    $(img.node).css({
                        width: $('#coverArt').width(),
                        height: $('#coverArt').height()
                    });
                    $('#coverArt').append(img.node);

                    $('#variation').append(list.node);
                    if (song.audio_summary.analysis_url) {
                        $('#visual').html('<span class="loading"></span>');
                        _startLoaders();

                        var updating = false;
                        var updateGraph = function (coll) {
                            updating = false;
                            if (coll.indexOf(models.player.track) != -1) {
                                $('#visualActive svg').width($('#visual').width() * models.player.position / models.player.track.duration);
                                if (models.player.playing) {
                                    updating = true;
                                    setTimeout(function () { updateGraph(coll);}, 300);
                                }
                            }
                        };

                        models.player.observe(models.EVENT.CHANGE, function(event) {
                            if (models.player.playing && song.collection.indexOf(models.player.track) != -1) {
                                updateGraph(song.collection);
                            }
                        });

                        EchoNest.song(song.id, function (songData) {
                            EchoNest.analysis(songData.audio_summary.analysis_url, function (analysis) {
                                $('#visual .loading').remove();
                                _visualize(analysis, '#visual', '#ccc');
                                _visualize(analysis, '#visualActive', '#888');
                                $('#visualActive svg').width(0);
                                updateGraph(song.collection);
                                $('#visuals').on('click', '#visualActive', function (e) {
                                    if (song.collection.indexOf(models.player.track) != -1) {
                                        var position = e.offsetX / $('#visual').width() * models.player.track.duration;
                                        models.player.position = position;
                                        if (!updating) {
                                            updateGraph(song.collection);
                                        }
                                    }
                                });
                            });
                        });
                    }
                }
                var tracks = {};
                song.collection = new models.Playlist();
                for (var i = 0; i < song.tracks.length; i++) {
                    totalTracks++;
                    t = models.Track.fromURI(song.tracks[i].uri, function (track) {
                        tracks[track.uri] = track;
                        totalTracks--;
                        if (totalTracks === 0) {
                            song.tracks = [];
                            for (var uri in tracks) {
                                if (tracks.hasOwnProperty(uri)) {
                                    song.tracks.push(tracks[uri]);
                                    song.collection.add(tracks[uri]);
                                }
                            }
                            render(song);
                        }
                    });
                }
                
            }       
        };
    }();

    var EchoNest = function () {

        var _addSong = function (songs, song) {
            var existing = $.grep(songs, function (s) {
                return s.artist_name == song.artist_name
                    && s.audio_summary.humanKey == song.audio_summary.humanKey
                    && s.audio_summary.humanTempo == song.audio_summary.humanTempo;
            });
            if (existing.length > 0) {
                songs[songs.indexOf(existing[0])].tracks = songs[songs.indexOf(existing[0])].tracks.concat(song.tracks);
            } else {
                song.uri = song.tracks[0].uri;
                songs.push(song);
            }
            return songs;
        };

        return {
            search: function (search, cb) {
                var xhr = new XMLHttpRequest(), API_KEY = 'UNLIBLAG0EIXWH9SQ',
                    url = 'http://developer.echonest.com/api/v4/song/search?api_key='+API_KEY
                        +'&bucket=id:spotify-WW&bucket=tracks&bucket=audio_summary&sort=song_hotttnesss-desc',
                    params = {
                        format: 'json',
                        results: 100,
                        limit: 'true'
                    };

                for (var key in search) {
                    if (search.hasOwnProperty(key)) {
                        params[key] = search[key]; 
                    }
                }
                for (var key in params) {
                    if (params.hasOwnProperty(key)) {
                        url += '&'+key+'='+params[key];
                    }
                }

                xhr.open('GET', url);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState != 4 || xhr.status != 200) return;
                    var results = JSON.parse(xhr.responseText);
                    var tmpSongs = results.response.songs,
                        songs = [];

                    for (var i = 0; i < tmpSongs.length; i++) {
                        if (tmpSongs[i].tracks && tmpSongs[i].tracks.length > 0) {
                            var hasSpotify = false;
                            for (var j = 0; j < tmpSongs[i].tracks.length; j++) {
                                tmpSongs[i].audio_summary.humanKey = getKey(
                                    tmpSongs[i].audio_summary.key,
                                    tmpSongs[i].audio_summary.mode);
                                tmpSongs[i].audio_summary.humanTempo = Math.round(tmpSongs[i].audio_summary.tempo);
                                if (tmpSongs[i].tracks[j].hasOwnProperty('foreign_id')) {
                                    hasSpotify = true;
                                    tmpSongs[i].tracks[j] = {
                                        uri: tmpSongs[i].tracks[j].foreign_id.replace('-WW', '')
                                    };
                                }
                            }
                            if (hasSpotify) {
                                songs = _addSong(songs, tmpSongs[i]);
                            }
                        }
                    }
                    'function' === typeof cb && cb(songs);
                };
                xhr.send(null);
            },

            song: function (id, cb) {
                var url = "http://developer.echonest.com/api/v4/song/profile?api_key=FILDTEOIK2HBORODV&format=json&id=" + id + "&bucket=audio_summary";
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState != 4 || xhr.status != 200) return;
                    var results = JSON.parse(xhr.responseText);
                    var song = results.response.songs[0];

                    'function' === typeof cb && cb(song);
                };
                xhr.send(null);
            }, 

            analysis: function (url, cb) {
                var xhr = new XMLHttpRequest();

                xhr.open('GET', url);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState != 4 || xhr.status != 200) return;
                    var results = JSON.parse(xhr.responseText);

                    'function' === typeof cb && cb(results);
                };
                xhr.send(null);
            }

        };
    }();

    var renderAlphabet = function () {
        $('.standards-letter').each(function () {
            var label = $(this).attr('data-label');
            if ($(this).find('.standard-entry:visible').length > 0) {
                $('#'+label).show();
                $('#hLink'+label).removeClass('disabled');;
            } else {
                $('#'+label).hide();
                $('#hLink'+label).addClass('disabled'); 
            }
        });
    };

    
    models.application.observe(models.EVENT.ARGUMENTSCHANGED, tabs);
    tabs();
    renderStandards();
    renderAlphabet();

    $('body').on('click', '.link', function (e) {
        var view = $(this).attr('data-view'), param = $(this).attr('data-params');
        view && View[view](param);
    });
    $('body').on('click', '.player', function (e) {
        e.preventDefault();
        var uri = $(this).attr('data-uri');
        uri && models.player.play(uri);
        return false;
    });
    $('body').on('keyup', '#filter', function (e) {
        var text = $(this).val().toLowerCase();
        $('.standard-entry').each(function () {
            if (text == '' || !text || $(this).html().toLowerCase().indexOf(text) >= 0) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
        renderAlphabet();
        e.preventDefault();
    });

    View.start();
};
