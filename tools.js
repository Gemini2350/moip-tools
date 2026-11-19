// ---- the tool catalogue: add an entry here to list a new tool ----
// Used by index.html (tiles) and tool.html (detail page, tool.html?t=<slug>).
//   slug      id of the detail page and name of the folder in shots/
//   repo      path below github.com/Gemini2350/
//   text      one or two sentences for the tile and the top of the detail page
//   features  the most important functions, one sentence each
//   shots     screenshots in shots/<slug>/: {file, caption}
//   sample    optional example output, shown as preformatted text: {title, text}
//   base      upstream project this one is based on
//   logo      optional logo of the tool (logos/<file>), shown next to its name
//   site      own homepage; download: true links to the latest GitHub release
const GH = "https://github.com/Gemini2350/";
const TOOLS = [
    {group: "NMOS", items: [
        {slug: "nmos-crosspoint", name: "NMOS Crosspoint v3", logo: "logos/nmos-crosspoint.svg", repo: "nmos-crosspoint_v3", base: "3dmedium/nmos_crosspoint",
         text: "Web-based NMOS controller for ST 2110 and AES67 networks: crosspoint matrix, multicast address management, BCP-008 health and audio monitoring.",
         tags: ["Docker", "NMOS", "IS-13", "ST 2110"],
         features: [
            "Crosspoint matrix: connect any sender to any receiver via IS-05, with autotake or stage and TAKE.",
            "Details page with every node, device, sender and receiver live from the registry: formats, bitrates, ST 2022-7 legs and SDP.",
            "Multicast address management from your own pools, optionally split by bandwidth. Duplicates are flagged.",
            "BCP-008 health per sender and receiver via IS-12, and a PTP dot per device that shows whether it is locked to the right grandmaster.",
            "Audio monitor: listen to any audio sender in the browser.",
            "Rename devices, senders and receivers: as an alias in the controller, or on the device itself via IS-13.",
            "Virtual senders bring devices without NMOS into the matrix with their SDP.",
            "Registry discovery via unicast DNS-SD, mDNS or a static address."
         ],
         shots: [
            {file: "crosspoint.png", caption: "Crosspoint matrix"},
            {file: "details.png", caption: "Details page"},
            {file: "bcp008-status.png", caption: "BCP-008 status"}
         ]},
        {slug: "nmos-federation", name: "NMOS Federation", repo: "nmos-federation",
         text: "Gateway between separate ST 2110 / NMOS systems: bridges with virtual senders and receivers, SDP rewrite and multicast NAT.",
         tags: ["Docker", "NMOS", "ST 2110"],
         shotsNote: "Taken with two demo systems and the mock switch driver.",
         shots: [
            {file: "status.png", caption: "Status: registries and the active channels with their translated addresses"},
            {file: "devices.png", caption: "Virtual devices: copy senders and receivers from one system into the other"}
         ],
         features: [
            "Runs virtual NMOS receivers in one domain and mirrors every source connected to them as a virtual NMOS sender in another domain.",
            "The media does not pass through the software: it is forwarded by multicast NAT on the switch (Arista EOS), with red and blue fabric kept separate.",
            "One internal domain and any number of external ones, each with its own interface, address pool and one or more registries.",
            "Rewrites the SDP to the translated multicast addresses.",
            "Registries by IP and port or by DNS-SD, with a status line and a test button per registry.",
            "Mock driver: logs the switch commands instead of sending them, so you can try the whole setup without touching the network."
         ],
         sample: {title: "How it works", text:
`  domain "internal"                      domain "partnerA"  (…partnerB, …)
  ┌───────────────────┐                  ┌───────────────────┐
  │ real sender       │                  │ real receiver     │
  │ 239.10.1.5:5004   │                  │ joins 239.200.0.0 │
  └─────────┬─────────┘                  └─────────▲─────────┘
            │ switch joins via IGMP/PIM            │
  ┌─────────▼──────────────── switch ──────────────┴─────────┐
  │  ip nat destination static 239.10.1.5 → 239.200.0.1      │  (once per fabric)
  └──────────────────────────────────────────────────────────┘
            ▲                                      ▲
  ┌─────────┴─────────┐  eAPI            ┌──────────┴────────┐
  │ internal registry │◄── nmos-federation ──►│ registries 1..n │
  │ virtual receivers │   (Docker, web GUI)   │ virtual senders │
  └───────────────────┘                       └─────────────────┘`}},
        {slug: "nmos-registry", name: "NMOS Registry", repo: "nmos-cpp-registry",
         text: "Dockerised AMWA NMOS registry built from sony/nmos-cpp, bundled with the nmos-js browser UI.",
         tags: ["Docker", "NMOS"],
         shotsNote: "Taken with made-up demo devices and addresses.",
         shots: [
            {file: "nodes.png", caption: "Nodes in the registry, in the bundled browser UI"},
            {file: "sender.png", caption: "A sender with its flow, device and transport file"}
         ],
         features: [
            "Built from a current sony/nmos-cpp with the Conan 2 toolchain. The widely used older image is pinned to a 2022 commit.",
            "IS-04 Registration and Query API on port 8010, with the nmos-js browser UI at /admin/.",
            "The browser UI includes MXL support, BCP-008 status panels and an IS-12 device model browser.",
            "DNS-SD is built in (mDNSResponder), so nodes find the registry without Avahi on the host.",
            "MQTT broker (mosquitto) for IS-07 events, announced via mDNS.",
            "One docker run command; a newer upstream commit can be selected with a build argument."
         ]},
        {slug: "legacy2nmos", name: "Legacy2NMOS", repo: "Legacy2NMOS",
         text: "Gateway between Dante/AES67 and NMOS: publishes SAP-announced streams as NMOS senders and exposes Dante devices as NMOS receivers.",
         tags: ["Docker", "Desktop", "SAP", "NMOS", "Dante"],
         shotsNote: "Taken with made-up demo devices and addresses.",
         shots: [
            {file: "sap.png", caption: "SAP-announced streams, registered as NMOS senders"}
         ],
         features: [
            "Listens to SAP announcements and registers the streams as senders in an NMOS IS-04 registry.",
            "Live table of all discovered streams: name, multicast address, format, source IP and registration status.",
            "Manual SDP entry for streams that are not announced.",
            "Exposes AES67-enabled Dante devices as NMOS receivers: an IS-05 patch becomes a Dante control command. Parts of this path are reverse-engineered, so verify it with a test device.",
            "BCP-008 receiver monitoring over IS-12, so a controller sees whether the patch reached the device.",
            "Finds the registry by unicast DNS-SD, skips senders that are already registered and cleans up after itself.",
            "Runs as a desktop app for Windows and macOS or as a Docker container."
         ]}
    ]},
    {group: "AES67 & audio", items: [
        {slug: "aes67eleven", name: "AES67eleven", repo: "aes67eleven", site: "https://gemini2350.github.io/aes67eleven/", download: true,
         text: "AES67 virtual soundcard for macOS with a PTP-disciplined clock and full NMOS control. Also runs as a headless Docker gateway.",
         tags: ["macOS", "Docker", "AES67", "NMOS"],
         features: [
            "64 × 64 channel Core Audio device at 48 kHz. Its clock follows the PTP grandmaster, so there is no sample-rate conversion in the audio path.",
            "Up to 64 senders and 64 receivers with up to 8 channels each (L24 or L16, 1 ms), placed anywhere on the device channels.",
            "ST 2022-7 seamless redundancy on two interfaces.",
            "NMOS IS-04, IS-05, IS-12 and IS-13, with BCP-008 sender and receiver monitors.",
            "Web UI with stream tiles, level meters and PTP status, plus a four-deck WAV/MP3 player and a local monitor output.",
            "The same engine runs headless on Linux as a Docker gateway for amd64 and arm64."
         ],
         shots: [
            {file: "streams.jpg", caption: "Streams page: one tile per sender and receiver"},
            {file: "overview.jpg", caption: "Overview: PTP, NMOS, interfaces and 64-channel meters"}
         ]},
        {slug: "aes67-srt-bridge", name: "AES67 SRT Bridge", repo: "aes67-srt-bridge",
         text: "Carries AES67 streams over SRT between sites. Docker container with web GUI and NMOS virtual senders and receivers.",
         tags: ["Docker", "AES67", "SRT", "NMOS"],
         shotsNote: "Taken on a test link with generated audio.",
         shots: [
            {file: "tx.png", caption: "Sending site: two TX channels with BCP-008 status"},
            {file: "rx.png", caption: "Receiving site: the same streams arriving over SRT"}
         ],
         features: [
            "A TX channel is a virtual NMOS receiver: when a controller patches it, the bridge joins the multicast and sends it to the SRT peer.",
            "An RX channel is a virtual NMOS sender: it receives SRT and plays the stream out to its own multicast group.",
            "The source SDP travels along on a second small SRT link, so the far end publishes the right format without any other connection between the sites.",
            "RTP timestamps pass through unchanged, or are restamped to local PTP time per channel.",
            "Optional forward error correction and passphrase per channel; several channels per container.",
            "IS-12 with BCP-008 monitors that report the multicast input, the SRT link and the output, plus IS-13 for labels and tags."
         ],
         sample: {title: "How it works", text:
` site A                                                         site B
 AES67 sender ──mcast──► [TX channel]  ══ SRT ══►  [RX channel] ──mcast──► AES67 receivers
                          virtual NMOS receiver      virtual NMOS sender
                          (IS-05 patchable)          (rewritten source SDP, own multicast)`}},
        {slug: "pi-audio-node", name: "pi-audio-node", repo: "pi-audio-node",
         text: "AES67 audio node for the Raspberry Pi — the protocol stack AES67eleven grew out of.",
         tags: ["Raspberry Pi", "AES67", "NMOS", "PTP"],
         features: [
            "Receiver for AES67 L24/L16 with ST 2022-7 seamless protection over two interfaces and PTP-anchored playout at 5 to 10 ms delay.",
            "Sender for test tone, sweep, WAV or MP3, paced by the PTP media clock.",
            "PTP analyzer: every announce source with its full dataset, the field the best-master decision fell on, and a comparison of the grandmasters on both networks.",
            "NMOS IS-04 and IS-05, IS-12 with BCP-008 sender and receiver monitors, and a browser for all audio senders in the registry.",
            "Touch-friendly web UI with level meters, shown fullscreen on the Pi's touchscreen.",
            "A single C++ daemon; one install script sets up the service and the kiosk display."
         ],
         shots: [
            {file: "receiver.png", caption: "Receiver"},
            {file: "sender.png", caption: "Sender"}
         ]},
        {slug: "aes67-monitor", name: "AES67 Monitor + NMOS", repo: "aes67-monitor/tree/feature/nmos", base: "philhartung/aes67-monitor",
         text: "Phil Hartung's AES67 Stream Monitor, extended with NMOS: IS-04/IS-05 receiver node, registry discovery and an NMOS streams tab.",
         tags: ["Desktop", "AES67", "NMOS"],
         features: [
            "Added in this fork: the monitor registers as an NMOS receiver node (IS-04/IS-05), so a controller can patch a stream onto it.",
            "Added in this fork: registry discovery and a tab that lists the streams from the NMOS registry.",
            "Listens to AES67, RAVENNA and ST 2110-30 streams: L16 and L24, up to 64 channels.",
            "Finds streams automatically via SAP; raw SDP can be added by hand.",
            "Pick single channels or stereo pairs to listen to; filter and sort the stream list.",
            "Desktop app for macOS, Windows and Linux."
         ],
         shotsNote: "Screenshots from the upstream project; the NMOS tab is not shown.",
         shots: [
            {file: "streams.png", caption: "Streams overview"},
            {file: "details.png", caption: "Stream details"},
            {file: "settings.png", caption: "Settings"}
         ]}
    ]},
    {group: "ST 2110 & capture analysis", items: [
        {slug: "stream-viewer", name: "ST 2110 / AES67 Stream Viewer", repo: "ST2110-AES67-Stream-Viewer", download: true,
         text: "Opens a Wireshark capture and lists every AES67 and ST 2110 stream in it: audio playback and WAV export, video frame preview, packet loss, jitter and a check against the PTP clock.",
         tags: ["macOS", "Windows", "ST 2110", "AES67", "PTP"],
         features: [
            "Lists all streams in a .pcap or .pcapng file by multicast address, source, SSRC and detected format.",
            "Audio (AES67, ST 2110-30/-31): format detection, playback with seek bar and WAV export.",
            "Uncompressed video (ST 2110-20): resolution and frame rate from the payload, frame preview with scrubbing, PNG export.",
            "JPEG XS (ST 2110-22, IPMX): detection and export of the frames as .jxs codestreams.",
            "Analysis per stream: packet loss with an event list, RFC 3550 jitter, packet spacing and a timing graph.",
            "PTP comparison: rebuilds the grandmaster time from the capture and shows whether a sender's RTP timestamps are locked to it."
         ],
         shots: [
            {file: "main.png", caption: "Stream list"},
            {file: "analysis.png", caption: "Analysis: loss, jitter and RTP timestamps against PTP"},
            {file: "video.png", caption: "Video frame preview"}
         ]}
    ]},
    {group: "Dante", items: [
        {slug: "dvs-ptpv2-unlock", name: "DVS PTPv2 Unlock", repo: "dvs-ptpv2-unlock", download: true,
         text: "Switches on PTPv2 in the Dante Virtual Soundcard with one double-click, on macOS and Windows. Unofficial — not supported by Audinate.",
         base: "tschiemer/dvs-ptp-mitm", tags: ["macOS", "Windows", "Dante", "PTP"],
         features: [
            "One switch: Enable PTPv2 or Disable PTPv2. The PTP service is restarted for you.",
            "Show status reads the running PTP process, not just the stored setting, so you know whether PTPv2 is really on.",
            "Prebuilt for macOS and Windows: no compiler and no Terminal needed.",
            "Disable restores the original file and leaves nothing behind. No background service, no system settings changed.",
            "Uses undocumented options of the Dante Virtual Soundcard and may stop working with a DVS update. Disable it before contacting Audinate support."
         ],
         shots: [
            {file: "macos-menu.png", caption: "The switch"},
            {file: "macos-status.png", caption: "Status dialog"}
         ]}
    ]},
    {group: "PTP & network", items: [
        {slug: "ptpv2-health-analyzer", name: "PTPv2 Health Analyzer", repo: "ptpv2-health-analyzer",
         text: "Wireshark Lua plugin: delay request/response matching, rogue master detection, announce and priority tracking.",
         tags: ["Wireshark", "PTP"],
         features: [
            "Matches every Delay_Req to its Delay_Resp (and Pdelay): unanswered requests are listed with sequence number, frame and time, plus response times.",
            "Rogue master detection: several Sync senders in one domain, Sync without Announce, or more than one grandmaster claimed.",
            "Announce overview per domain: grandmaster identity, priorities, clock class and accuracy.",
            "Tracks changes over the capture, for example a grandmaster failover or a GPS loss, with time and old and new value.",
            "Compares measured Sync and Announce rates with the announced intervals, and reports sequence gaps, duplicates and two-step Syncs without Follow_Up.",
            "Runs from the Wireshark Tools menu or in tshark, for PTP over UDP and over Ethernet."
         ],
         sample: {title: "Example report", text:
`-- WARNINGS ----------------------------------------------------------
  [!] ROGUE MASTER? Domain 0 has 2 simultaneous Sync senders: ...
  [!] Domain 0: cc:cc:cc:ff:fe:00:00:03 p1 (10.0.0.3) sends Sync but no Announce
  [!] Domain 0: 2 different grandmasters claimed in Announce: ...
  [!] 1 change(s) in Announce datasets (priority/class/accuracy/GM)
  [!] 1 Delay_Req from bb:bb:bb:ff:fe:00:00:02 p1 (10.0.0.2) NOT answered
  [!] Sync from aa:aa:aa:ff:fe:00:00:01 p1 (dom 0): 1 message(s) missing in sequence
  [!] 1 two-step Sync(s) without matching Follow_Up

-- DELAY REQUEST/RESPONSE (E2E) --------------------------------------
Requester bb:bb:bb:ff:fe:00:00:02 p1   src 10.0.0.2   (domain 0)
  requests 8, answered 6 (75.0%), unanswered 2, duplicate seq 0
  response time min/avg/max: 3.000 / 3.000 / 3.000 ms
  answered by: aa:aa:aa:ff:fe:00:00:01 (6 resp)
  UNANSWERED: seq 3  frame 32  t=1.500s`}},
        {slug: "ptp-wallclock", name: "PTP Wallclock", repo: "ptp-wallclock",
         text: "A PTP client for the Raspberry Pi that makes time visible: on an LED matrix wall clock, as a fullscreen browser clock and, with a GNSS receiver, as a grandmaster and measurement instrument.",
         tags: ["Raspberry Pi", "Docker", "PTP"],
         features: [
            "LED matrix wall clock on a Raspberry Pi, with several time zones, display styles and grandmaster alerts.",
            "Fullscreen browser clock and a PTP analysis web UI: visible masters, offset, delay and PDV charts.",
            "Runs headless in Docker on any Linux machine in the PTP network, without LED hardware.",
            "With a GNSS receiver it becomes a grandmaster and measures your network's time against GPS.",
            "One binary for all three builds; one install script on the Pi."
         ],
         shots: [
            {file: "clock2.png", caption: "LED wall clock"},
            {file: "browser-clock.png", caption: "Browser clock"},
            {file: "browser-clock2.png", caption: "Browser clock, second style"}
         ]},
        {slug: "igmp-test-tool", name: "IGMP Test Tool", repo: "igmp-test-tool", download: true,
         text: "Multicast test tool: IGMP joins (ASM/SSM) per interface with live receive statistics. Web GUI or native app, no dependencies.",
         tags: ["macOS", "Windows", "Linux", "Multicast"],
         shotsNote: "Taken in a test network with generated streams.",
         shots: [
            {file: "main.png", caption: "Web GUI: join form, library and active joins with live bitrate"}
         ],
         features: [
            "Joins multicast groups on the interface you choose: ASM, or SSM (IGMPv3) when you enter a source.",
            "Counts received packets and shows the bitrate per join; the UDP port can be detected automatically.",
            "IGMP querier analysis: shows the querier's IP address, IGMP version and query interval.",
            "Notices when an interface goes down under an active join and marks the join as interrupted.",
            "Two variants with the same functions: a native app and a web GUI in the browser.",
            "Prebuilt for macOS and Windows, or run the single Python file. Standard library only."
         ]},
        {slug: "impairment-gui", name: "Impairment GUI", repo: "impairment-gui",
         text: "Web GUI to switch packet loss and jitter on and off per network leg — for testing seamless redundancy.",
         tags: ["Docker", "ST 2022-7"],
         shotsNote: "Taken against a simulated switch.",
         shots: [
            {file: "main.png", caption: "Packet loss on leg A, jitter on leg B, PTP ports and power"}
         ],
         features: [
            "Packet loss per leg, switched on and off with storm-control on the leg's Arista switch port.",
            "Jitter on leg A or leg B: the leg is moved by VLAN through one impairment device.",
            "Shuts the PTP grandmaster port down and up, with live link status.",
            "Switches a Philips Hue smart plug, for power failure tests.",
            "Everything is set up in the browser: switch, ports, VLANs, delay and jitter values.",
            "Built for one specific lab setup (Arista eAPI and a p_cap impairment device); take it as a starting point for your own."
         ]},
        {slug: "kea-manager", name: "Kea Manager", repo: "kea-manager",
         text: "Web UI for ISC Kea DHCPv4: subnets, reservations, live leases and DDNS in a lightweight Docker container.",
         tags: ["Docker", "DHCP"],
         shotsNote: "Taken with made-up demo devices and addresses.",
         shots: [
            {file: "leases.png", caption: "Live leases per subnet, with vendor lookup"},
            {file: "subnets.png", caption: "Subnets with groups and static reservations"}
         ],
         features: [
            "Live lease view straight from the running server, grouped per subnet, with search and vendor lookup. Changes appear within seconds.",
            "Turn a lease into a static reservation, or delete it, directly in the table.",
            "Subnet management: pools, relay, gateway and DNS. Several consecutive subnets can be created in one go.",
            "Reservations by MAC address or by switch port (DHCP option 82), per subnet or for a whole group of subnets.",
            "Dynamic DNS with forward and reverse zones and TSIG keys, all from the GUI.",
            "Log viewer, JSON configuration editor with validation, import and export, and user management."
         ]}
    ]}
];
const ALL_TOOLS = TOOLS.flatMap(g => g.items.map(t => ({...t, group: g.group})));
const esc = t => String(t).replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));
const toolUrl = t => "tool.html?t=" + encodeURIComponent(t.slug);
