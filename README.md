# MXTimer
Timer Plugin for JavaScript

## 1\. Installation MXTimer

1.  Download files !

2.  Add the code inside the body tag.

    <div style="background: #ffffff; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;">

    <pre style="margin: 0; line-height: 125%"><span style="color: #007700">&lt;script</span> <span style="color: #0000CC">src=</span><span style="background-color: #fff0f0">"mx-timer.js"</span><span style="color: #007700">&gt;&lt;/script&gt;</span>
    </pre>

    </div>

3.  Start coding freely :)

## 2\. Examples

1.  Easily create timers.

    <div style="background: #ffffff; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;">

    <pre style="margin: 0; line-height: 125%"><span style="color: #008800; font-weight: bold">var</span> myTimer <span style="color: #333333">=</span> <span style="color: #008800; font-weight: bold">new</span> Timer({
        func<span style="color: #333333">:</span> <span style="color: #008800; font-weight: bold">function</span> () {
            console.log(<span style="background-color: #fff0f0">'is timer function'</span>);
        },
        interval<span style="color: #333333">:</span> <span style="color: #0000DD; font-weight: bold">1000</span>, <span style="color: #888888">// interval 1 second.</span>
        autoStart<span style="color: #333333">:</span> <span style="color: #008800; font-weight: bold">true</span> <span style="color: #888888">// Automatic start timer.</span>
    });
    </pre>

    </div>

2.  Define events within options.

    <div style="background: #ffffff; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;">

    <pre style="margin: 0; line-height: 125%"><span style="color: #008800; font-weight: bold">var</span> myTimer <span style="color: #333333">=</span> <span style="color: #008800; font-weight: bold">new</span> Timer({
        func<span style="color: #333333">:</span> <span style="color: #008800; font-weight: bold">function</span> () {
            console.log(<span style="background-color: #fff0f0">'is timer function'</span>);
        },
        interval<span style="color: #333333">:</span> <span style="color: #0000DD; font-weight: bold">2000</span>, <span style="color: #888888">// interval 2 second.</span>
        autoStart<span style="color: #333333">:</span> <span style="color: #008800; font-weight: bold">true</span>, <span style="color: #888888">// Automatic start timer.</span>
        initializer<span style="color: #333333">:</span> <span style="color: #008800; font-weight: bold">function</span> () {
            console.log(<span style="background-color: #fff0f0">'On initialize timer.'</span>); <span style="color: #888888">// This function calls the timer constructor.</span>
        },
        onafterstart<span style="color: #333333">:</span> <span style="color: #008800; font-weight: bold">function</span> () {
            console.log(<span style="background-color: #fff0f0">'After start timer.'</span>); <span style="color: #888888">// This function is executed every time after the timer runs.</span>
        },
        onstart<span style="color: #333333">:</span> <span style="color: #008800; font-weight: bold">function</span> () {
            console.log(<span style="background-color: #fff0f0">'Start timer.'</span>); <span style="color: #888888">// This function is executed every time the timer runs.</span>
        },
        onafterstop<span style="color: #333333">:</span> <span style="color: #008800; font-weight: bold">function</span> () {
            console.log(<span style="background-color: #fff0f0">'After stop timer.'</span>); <span style="color: #888888">// This function is executed after it has been stopped in time.</span>
        },
        onstop<span style="color: #333333">:</span> <span style="color: #008800; font-weight: bold">function</span> () {
            console.log(<span style="background-color: #fff0f0">'Stop timer.'</span>); <span style="color: #888888">// This function is executed when the timer is stopped.</span>
        },
        callback<span style="color: #333333">:</span> <span style="color: #008800; font-weight: bold">function</span> () {
            console.log(<span style="background-color: #fff0f0">'Callback timer.'</span>); <span style="color: #888888">// Callback function</span>
        }
    });
    </pre>

    </div>

3.  Define events after create timer.

    <div style="background: #ffffff; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;">

    <pre style="margin: 0; line-height: 125%"><span style="color: #008800; font-weight: bold">var</span> myTimer <span style="color: #333333">=</span> <span style="color: #008800; font-weight: bold">new</span> Timer({
        func<span style="color: #333333">:</span> <span style="color: #008800; font-weight: bold">function</span> () {
            console.log(<span style="background-color: #fff0f0">'is timer function'</span>);
        },
        interval<span style="color: #333333">:</span> <span style="color: #0000DD; font-weight: bold">2000</span>, <span style="color: #888888">// interval 2 second.</span>
        autoStart<span style="color: #333333">:</span> <span style="color: #008800; font-weight: bold">true</span>, <span style="color: #888888">// Automatic start timer.</span>
    });
    myTimer.on(<span style="background-color: #fff0f0">'start'</span>, <span style="color: #008800; font-weight: bold">function</span> ($this) {
        console.log(<span style="background-color: #fff0f0">'Starting'</span>);
    }).on(<span style="background-color: #fff0f0">'stop'</span>, <span style="color: #008800; font-weight: bold">function</span> () {
        console.log(<span style="background-color: #fff0f0">'stopping'</span>);
    });
    </pre>

    </div>

## 3\. Options

<table border="1" width="100%" cellpadding="0" cellspacing="0">

<thead>

<tr>

<th width="100">Option Name</th>

<th width="100">Type</th>

<th>Details</th>

</tr>

</thead>

<tbody>

<tr>

<td class="title">func</td>

<td class="title">function</td>

<td>Function to be called</td>

</tr>

<tr>

<td class="title">interval</td>

<td class="title">int</td>

<td>Interval in miliseconds. (1s = 1000 ms)</td>

</tr>

<tr>

<td class="title">group_name</td>

<td class="title">string</td>

<td>If you want to group the timer, enter the group name. Note: The _global group name is used by the plugin.</td>

</tr>

<tr>

<td class="title">autoStart</td>

<td class="title">bool</td>

<td>Auto start timer.</td>

</tr>

<tr>

<td class="title">initializer</td>

<td class="title">function</td>

<td>This function calls the timer constructor.</td>

</tr>

<tr>

<td class="title">onafterstart</td>

<td class="title">function|function[]</td>

<td>This function is executed every time after the timer runs.</td>

</tr>

<tr>

<td class="title">onstart</td>

<td class="title">function|function[]</td>

<td>This function is executed every time the timer runs.</td>

</tr>

<tr>

<td class="title">onafterstop</td>

<td class="title">function|function[]</td>

<td>This function is executed after it has been stopped in time.</td>

</tr>

<tr>

<td class="title">onstop</td>

<td class="title">function|function[]</td>

<td>This function is executed when the timer is stopped.</td>

</tr>

<tr>

<td class="title">callback</td>

<td class="title">function|function[]</td>

<td>Callback function</td>

</tr>

</tbody>

</table>

## 4\. Methods

<table border="1" width="100%" cellpadding="0" cellspacing="0">

<thead>

<tr>

<th width="100">Method Name</th>

<th width="100">Return Type</th>

<th>Details</th>

</tr>

</thead>

<tbody>

<tr>

<td class="title">getCount</td>

<td class="title">int</td>

<td>The number of times the timer works</td>

</tr>

<tr>

<td class="title">trigger</td>

<td class="title">Timer</td>

<td>Trigger timer events.</td>

</tr>

<tr>

<td class="title">on</td>

<td class="title">Timer</td>

<td>Binding events.</td>

</tr>

<tr>

<td class="title">start</td>

<td class="title">Timer</td>

<td>Start timer.</td>

</tr>

<tr>

<td class="title">reset</td>

<td class="title">Timer</td>

<td>Reset timer. Like myTimer.stop(true).start();</td>

</tr>

<tr>

<td class="title">stop</td>

<td class="title">Timer</td>

<td>Stop timer.</td>

</tr>

</tbody>

</table>

## 5\. Events

<table border="1" width="100%" cellpadding="0" cellspacing="0">

<thead>

<tr>

<th width="100">Event Name</th>

<th>Details</th>

</tr>

</thead>

<tbody>

<tr>

<td class="title">onafterstart</td>

<td>This function is executed every time after the timer runs.</td>

</tr>

<tr>

<td class="title">onstart</td>

<td>This function is executed every time the timer runs.</td>

</tr>

<tr>

<td class="title">onafterstop</td>

<td>This function is executed after it has been stopped in time.</td>

</tr>

<tr>

<td class="title">onstop</td>

<td>This function is executed when the timer is stopped.</td>

</tr>

</tbody>

</table>

## 6\. Errors

<table border="1" width="100%" cellpadding="0" cellspacing="0" id="errors">

<thead>

<tr>

<th>Error</th>

<th width="100">Class</th>

<th>Details</th>

</tr>

</thead>

<tbody>

<tr>

<td class="title">Invalid argument was sent for adding timer.</td>

<td class="title">TimerInvalidAddArgs</td>

<td>If a value other than object type is entered while adding the timer, you will get this error message. You can get help from the examples above when adding timers.</td>

</tr>

<tr>

<td class="title">Timer function not defined correctly.</td>

<td class="title">TimerIsNotFunction</td>

<td>The timer has to be defined as a function. The reason for encountering this error is to define a real function.</td>

</tr>

<tr>

<td class="title">Invalid Interval value. Interval to be bigger than zero.</td>

<td class="title">TimerInvalidAddArgs</td>

<td>Timer interval must be greater than zero.</td>

</tr>

</tbody>

</table>
