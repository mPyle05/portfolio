// ============================================================================
//  SITE DATA | MASON PYLE
//  Embedded Systems, Firmware Architecture & Hardware-Software Co-Design
// ============================================================================

const siteData = {
  // --------------------------------------------------------------------
  // SITE-WIDE SETTINGS
  // --------------------------------------------------------------------
  site: {
    domain: "masonpyle.com",
    featuredProjectsOnHome: 3,
  },

  analytics: {
    provider: "none", // "none" | "goatcounter" | "cloudflare" | "plausible"
    goatcounterCode: "",
    cloudflareToken: "",
    plausibleDomain: "",
  },

  // --------------------------------------------------------------------
  // PERSON / IDENTITY
  // --------------------------------------------------------------------
  person: {
    name: "Mason Pyle",
    initials: "MP",
    role: "Embedded Systems & Firmware Engineer",
    location: "Cincinnati, OH",
    tagline: "Cincinnati, OH · UC Accelerated M.Eng. & B.S. (VLSI Focus)",
    email: "pylemd@mail.uc.edu",
    resumeUrl: "/resume.pdf",
    resumeLocal: "/resume.pdf",
  },

  social: [
    { label: "GitHub", url: "https://github.com/mPyle05" },
    { label: "LinkedIn", url: "https://linkedin.com/in/mason-pyle" },
  ],

  nav: [
    { href: "/#work", label: "Work" },
    { href: "/projects/", label: "Projects" },
    { href: "/#experience", label: "Experience" },
    { href: "/#about", label: "About" },
    { href: "/#contact", label: "Contact" },
  ],

  // --------------------------------------------------------------------
  // HOME PAGE - HERO
  // --------------------------------------------------------------------
  hero: {
    heading: "Mason Pyle",
    subheading: "Embedded firmware, PCB design, and hardware-software co-design.",
    paragraph:
      "I design multi-layer circuit boards, write bare-metal C/C++ firmware for ARM Cortex and RP2040 microcontrollers, and deploy real-time communication buses (CAN, SPI, I2C). Outside the lab I run a self-hosted Proxmox server, build FPV quads, and study VLSI. Currently completing an accelerated Master's + Bachelor's in Computer Engineering at UC (3.93 GPA).",
    primaryCta: { label: "View résumé", href: "" }, // filled from person.resumeUrl
    secondaryCta: { label: "Get in touch", href: "" }, // filled from person.email
  },

  // --------------------------------------------------------------------
  // PROJECTS
  // --------------------------------------------------------------------
  projects: [
    {
      slug: "keyboard",
      title: "RP2040 Custom Mechanical Keyboard",
      dates: "Dec 2024 - Jan 2026",
      context: "Hardware & Firmware",
      featured: true,
      summary:
        "Custom 91-key mechanical keyboard designed from bare PCB to firmware: 10×9 diode matrix, 82-pixel addressable RGB with custom procedural animation classes, and KMK / CircuitPython layer remapping.",
      tags: ["CircuitPython", "KMK Firmware", "RP2040", "KiCad PCB", "NeoPixel RGB", "CAD"],
      links: {
        repo: "https://github.com/mPyle05",
      },
      overview: {
        intro:
          "Designed from the copper up: a custom PCB routing a 10-row × 9-column switch matrix (91 keys), COL2ROW diode isolation, and an 82-LED addressable NeoPixel chain driven on an RP2040 microcontroller. Firmware is built with KMK on CircuitPython, featuring custom multi-layer remapping and procedural RGB animation modes.",
        bullets: [
          "Designed and routed a custom PCB in KiCad featuring a 10×9 matrix with 1N4148 surface-mount diodes (COL2ROW orientation) for complete anti-ghosting",
          "Chained and decoupled 82 addressable NeoPixel RGB LEDs, powered with local bypass capacitors and driven at 60 Hz over RP2040 GPIO SDA",
          "Mapped 19 dedicated GPIO pins (Rows: D0-D8, SCL; Cols: D9, D10, A0-A3, SCK, MISO, MOSI) to interface all 91 switch positions",
          "Implemented KMK firmware on CircuitPython with multi-layer keymaps, momentary layer toggles (numpad/navigation, RGB controls, function keys), and transparent passthroughs",
          "Authored custom procedural lighting modes (such as MovingGradient) extending KMK's AnimationModes with time-based modulo color math",
          "Modeled a two-piece precision enclosure and switch plate in CAD, toleranced for switch retention and acoustic dampening",
        ],
      },
      specs: [
        { label: "Controller", value: "RP2040 (CircuitPython runtime)" },
        { label: "Matrix Layout", value: "10 Rows × 9 Columns (91 key positions)" },
        { label: "Diode Logic", value: "COL2ROW 1N4148 diodes (anti-ghosting)" },
        { label: "RGB Lighting", value: "82 addressable NeoPixels @ 60 Hz refresh rate" },
        { label: "Firmware Stack", value: "KMK Keyboard Framework + Custom RGB Extensions" },
        { label: "GPIO Mapping", value: "19 Pins (10 Row outputs, 9 Col inputs, 1 RGB DIN)" },
      ],
      diagrams: [
        { label: "Schematic", path: "public/images/keyboard/schematic.png" },
        { label: "PCB layout", path: "public/images/keyboard/pcb-layout.png" },
        { label: "Switch matrix", path: "public/images/keyboard/matrix.png" },
      ],
      code: {
        heading: "Firmware: KMK Matrix Mapping & Custom Procedural RGB",
        intro:
          "Built on KMK and CircuitPython. The firmware defines the 10×9 matrix pinout, COL2ROW diode orientation, and multi-layer keymaps. A custom MovingGradient animation class extends AnimationModes, calculating real-time modulo color steps across all 82 LEDs.",
        language: "python",
        snippet: `# firmware/code.py | KMK Firmware with Custom RGB Animation
import time
import board as b
from kmk.kmk_keyboard import KMKKeyboard
from kmk.keys import KC
from kmk.scanners import DiodeOrientation
from kmk.extensions.RGB import RGB
from kmk.extensions.rgb import AnimationModes
from kmk.modules.layers import Layers

keyboard = KMKKeyboard()
keyboard.modules.append(Layers())

# 82-Pixel Addressable RGB Backlight Configuration
rgb = RGB(
    pixel_pin=b.SDA,
    num_pixels=82,
    val_default=100,
    refresh_rate=60,
    animation_mode=AnimationModes.RAINBOW,
)
keyboard.extensions.append(rgb)

# 10-Row × 9-Col Switch Matrix (91 Keys, COL2ROW)
keyboard.col_pins = (b.D9, b.A3, b.A2, b.A1, b.A0, b.SCK, b.MISO, b.MOSI, b.D10)
keyboard.row_pins = (b.D0, b.D1, b.D2, b.D3, b.D4, b.D5, b.D6, b.D7, b.D8, b.SCL)
keyboard.diode_orientation = DiodeOrientation.COL2ROW

# Custom Procedural Moving Gradient Animation Class
class MovingGradient(AnimationModes):
    def __init__(self, speed=0.05):
        self.speed = speed
        self.offset = 0
        self.last_update = time.monotonic()

    def animate(self, keyboard):
        now = time.monotonic()
        if now - self.last_update < self.speed:
            return
        self.last_update = now
        rgb = keyboard.extensions[0]
        for i in range(rgb.num_pixels):
            r = (i * 5 + self.offset) % 255
            g = (i * 3 + self.offset) % 255
            b = (i * 7 + self.offset) % 255
            rgb.pixels[i] = (r, g, b)
        self.offset += 1

if __name__ == '__main__':
    keyboard.go()`,
      },
      models: [
        { label: "Top housing CAD", path: "public/images/keyboard/case-top.png" },
        { label: "Switch plate CAD", path: "public/images/keyboard/switch-plate.png" },
      ],
      photos: [
        { label: "Assembled board", path: "photo-1.jpg" },
        { label: "Bare PCB", path: "photo-2.jpg" },
        { label: "RGB lit", path: "photo-3.jpg" },
        { label: "Build in progress", path: "photo-4.jpg" },
      ],
    },

    {
      slug: "solar-car",
      title: "Bearcat Solar Car | Low-Voltage Systems",
      dates: "Aug 2024 - Present",
      context: "American Solar Challenge | UC Racing",
      featured: true,
      summary:
        "Software lead for the low-voltage electronics on UC's solar racer. Architected a safety-critical CAN 2.0B network linking the BMS, driver cluster, and MPPT controllers across 1,500+ miles of public highway racing.",
      tags: ["CAN 2.0B", "Embedded C#", "KiCad", "Safety-Critical", "Telemetry", "ARM"],
      links: {
        site: "https://www.americansolarchallenge.org/",
        repo: "https://github.com/mPyle05",
      },
      overview: {
        intro:
          "The low-voltage subsystem serves as the vehicle nervous system: orchestrating driver safety instrumentation, state-of-charge telemetry, solid-state power distribution, and real-time CAN bus messaging across a high-EMI electrical environment over 1,500+ miles of highway racing.",
        bullets: [
          "Lead embedded software development for all low-voltage vehicular electronics and safety-critical driver instrumentation",
          "Architected CAN 2.0B network at 500 kbps linking HV BMS safety interlocks, MPPT solar controllers, and driver cockpit displays",
          "Authored CAN frame deserializer with timeout heartbeats, CRC parity validation, and real-time battery pack thermal monitoring",
          "Designed LV distribution and lighting controller PCBs in KiCad using high-side solid-state automotive switches (PROFET)",
          "Implemented hardware-in-the-loop telemetry logging on Linux gateways with Git version control for trackside race strategy",
        ],
      },
      specs: [
        { label: "Bus Protocol", value: "CAN 2.0B @ 500 kbps, 120Ω terminated twisted pair" },
        { label: "Telemetry Rate", value: "50 Hz critical BMS broadcast / 10 Hz auxiliary" },
        { label: "Safety", value: "Heartbeat watchdog with hardware fail-safe HV discharge" },
        { label: "Display", value: "SPI-driven high-contrast driver instrument HUD" },
        { label: "Power Isolation", value: "Galvanically isolated logic-to-inverter barrier" },
      ],
      diagrams: [
        { label: "CAN network topology", path: "public/images/solar-car/lv-block.png" },
        { label: "12V power distribution map", path: "public/images/solar-car/harness.png" },
        { label: "Instrument cluster schematic", path: "public/images/solar-car/cluster.png" },
      ],
      code: {
        heading: "Embedded Software: CAN Frame Dispatcher & Watchdog",
        intro:
          "Safety-critical telemetry packets are unpacked in real time with frame ID filtering, payload bitmask shifts, and a 250 ms watchdog timer that triggers a hardware safety interlock if BMS packets stall.",
        language: "csharp",
        snippet: `// Bearcat Solar Car LV: CAN 2.0B Telemetry Dispatcher & Watchdog
public class CanTelemetryDispatcher {
    private const uint ID_BMS_VOLTS = 0x3A0;
    private const uint ID_BMS_TEMP  = 0x3A1;
    private readonly Stopwatch _watchdog = Stopwatch.StartNew();
    private const long TIMEOUT_MS = 250;

    public struct PackTelemetry {
        public float TotalVoltage, PackCurrent, MaxTempC;
        public bool  IsFaulted;
    }
    private PackTelemetry _latest;

    public void OnCanFrame(uint id, byte[] data, byte dlc) {
        if (data == null || dlc < 4) return;
        switch (id) {
            case ID_BMS_VOLTS:
                // Big-Endian 16-bit: 0.1 V/bit, 0.1 A/bit
                _latest.TotalVoltage = ((data[0] << 8) | data[1]) * 0.1f;
                _latest.PackCurrent  = (short)((data[2] << 8) | data[3]) * 0.1f;
                _watchdog.Restart();
                break;
            case ID_BMS_TEMP:
                _latest.MaxTempC = data[1] - 40f; // Kelvin offset
                if (_latest.MaxTempC > 60f) TriggerThermalAlert();
                break;
        }
    }

    public bool HeartbeatOk() {
        if (_watchdog.ElapsedMilliseconds > TIMEOUT_MS) {
            _latest.IsFaulted = true;
            EngageSafetyShutdown();
            return false;
        }
        return true;
    }
}`,
      },
      models: [
        { label: "LV distribution enclosure", path: "public/images/solar-car/lv-board.png" },
        { label: "Dash display bezel CAD", path: "public/images/solar-car/enclosure.png" },
      ],
      photos: [
        { label: "Solar car on-track", path: "photo-1.jpg" },
        { label: "Telemetry bench validation", path: "photo-2.jpg" },
        { label: "Wiring harness & CAN drop", path: "photo-3.jpg" },
        { label: "Driver cockpit HUD", path: "photo-4.jpg" },
      ],
    },

    {
      slug: "homelab",
      title: "Self-Hosted Home Lab",
      dates: "2024 - Present",
      context: "Self-Hosted Infrastructure",
      featured: true,
      summary:
        "Modular, production-grade self-hosted homelab stack running on Proxmox VE. 10 decoupled Docker Compose stacks featuring Cloudflare Zero Trust tunnels, a WireGuard-isolated Servarr media acquisition fleet with atomic hardlinks, GPU-transcoded Jellyfin, Immich, Home Assistant with Matter, and Obsidian LiveSync.",
      tags: ["Proxmox", "Docker Compose", "WireGuard", "Cloudflare Tunnel", "Home Assistant", "Linux"],
      links: {
        repo: "https://github.com/mPyle05/home-lab",
      },
      overview: {
        intro:
          "Architected on a repurposed Lenovo desktop running Proxmox VE. Storage and services are cleanly partitioned: a dedicated LXC container manages the underlying ZFS storage pool, bind-mounted to a Debian Docker host. 10 isolated Docker Compose stacks communicate over segregated internal bridge networks (cloudflare_tunnelnet, servarrnetwork, and host network mode), with external access secured by Cloudflare Zero Trust.",
        bullets: [
          "Partitioned infrastructure into 10 decoupled Docker Compose directory stacks (cloudflare, homarr, home-assistant, immich, jellyfin, kavita, obsidian, servarr, vaultwarden, webdav) for independent lifecycle and update management",
          "Engineered a strict WireGuard VPN kill-switch pod using Gluetun in servarr/: qBittorrent, NZBGet, and Prowlarr are network-bound directly to the VPN container, eliminating IP leaks",
          "Implemented TRaSH Guides atomic hardlink storage structure across torrents and organized media libraries, enabling instant zero-copy file movement without duplicating storage",
          "Configured Cloudflare Zero Trust Tunnel (cloudflared) on dedicated cloudflare_tunnelnet bridge, exposing Vaultwarden, Immich, Kavita, Obsidian LiveSync, and WebDAV with zero open router ports",
          "Deployed Home Assistant on host network mode paired with a dedicated Python Matter controller container for local Thread and Wi-Fi smart home orchestration",
          "Passed through host GPU hardware acceleration (/dev/dri) to Jellyfin for real-time 4K/HDR video transcoding and direct play across client devices",
        ],
      },
      specs: [
        { label: "Hypervisor", value: "Proxmox VE on Lenovo desktop (x86_64)" },
        { label: "Storage Architecture", value: "ZFS pool via LXC bind-mount (TRaSH atomic hardlinks)" },
        { label: "Container Stacks", value: "10 Decoupled Compose Stacks (cloudflare, servarr, etc.)" },
        { label: "VPN Isolation", value: "Gluetun WireGuard kill-switch pod for downloaders" },
        { label: "Remote Ingress", value: "Cloudflare Zero Trust (cloudflare_tunnelnet bridge)" },
        { label: "Hardware Transcoding", value: "Direct GPU pass-through (/dev/dri) on Jellyfin" },
      ],
      diagrams: [
        { label: "Service architecture diagram", path: "public/images/homelab/architecture.png" },
        { label: "Network & tunnel topology", path: "public/images/homelab/network.png" },
        { label: "Proxmox VM/LXC layout", path: "public/images/homelab/proxmox.png" },
      ],
      code: {
        heading: "Service Fleet: 10 Docker Compose Stacks",
        intro:
          "Decoupled multi-stack architecture: rather than a fragile monolith, each service runs in an isolated directory with its own environment scoping, persistent volume mapping, and segregated internal bridge networking.",
        language: "docker-compose",
        snippet: ``,
      },
      models: [
        { label: "Server hardware layout", path: "public/images/homelab/hardware.png" },
        { label: "Storage partition / ZFS layout", path: "public/images/homelab/storage.png" },
      ],
      photos: [
        { label: "Proxmox dashboard", path: "photo-1.jpg" },
        { label: "Jellyfin media library", path: "photo-2.jpg" },
        { label: "Home Assistant overview", path: "photo-3.jpg" },
        { label: "Physical server setup", path: "photo-4.jpg" },
      ],
    },

    {
      slug: "vexu",
      title: "UC VEX U Robotics | Autonomous Odometry",
      dates: "Apr 2025 - Present",
      context: "UC Robotics | Co-Founder",
      featured: false,
      summary:
        "Co-founded UC's collegiate VEX U team (C1NCY). Developed 3-wheel tracking odometry with sub-2 mm accuracy, IMU sensor fusion, and cascading PID motion control.",
      tags: ["C++", "Odometry", "Sensor Fusion", "PID Control", "State Machines", "Autonomy"],
      links: {
        repo: "https://github.com/C1NCY",
        site: "https://www.cincyvexu.com/",
      },
      overview: {
        intro:
          "Co-founded UC's first collegiate VEX U robotics team from scratch. Spearheaded the technical architecture: 3-wheel tracking odometry, inertial sensor fusion, and cascading PID motion profiling for 45-second autonomous competition runs.",
        bullets: [
          "Designed 3-wheel tracking odometry (2 forward, 1 lateral) achieving <2 mm positional accuracy over 45-second autonomous routines",
          "Fused quadrature optical encoders with 3-axis IMU gyro using complementary filter to correct for wheel scrub and slippage",
          "Programmed cascading PID controllers with slew-rate limiting for smooth trajectory following and rapid heading stabilization",
          "Engineered asynchronous task scheduler to manage intake, pneumatics, and chassis positioning simultaneously",
          "Served as co-founder, programming lead, and club treasurer overseeing budgeting and university compliance",
        ],
      },
      specs: [
        { label: "Tracking Resolution", value: "360 ticks/rev quadrature (0.28 mm / tick)" },
        { label: "Update Rate", value: "100 Hz dedicated odometry thread" },
        { label: "Heading Accuracy", value: "±0.5° over 45s run via IMU gyro fusion" },
        { label: "Chassis Control", value: "Dual closed-loop PID (translation + heading)" },
        { label: "Role", value: "Co-founder, Programming Lead & Treasurer" },
      ],
      diagrams: [
        { label: "3-wheel odometry geometry", path: "public/images/vexu/auton-flow.png" },
        { label: "Sensor fusion architecture", path: "public/images/vexu/sensors.png" },
        { label: "Subsystem control flow & tasks", path: "public/images/vexu/wiring.png" },
      ],
      code: {
        heading: "Robotics Software: Tracking Odometry Update Loop",
        intro:
          "Running in a 10 ms background thread, this reads delta encoder ticks, converts raw counts to arc-chord approximations, rotates into the global field frame, and feeds positional error into the heading-corrected PID controller.",
        language: "cpp",
        snippet: `// UC VEX U (C1NCY): 3-Wheel Odometry Coordinate Update
#include <cmath>

struct Pose { double x = 0, y = 0, theta = 0; };

class OdometryTracker {
    Pose pose;
    double last_L = 0, last_R = 0, last_B = 0;
    const double TRACK   = 10.25;   // in: L/R wheel spacing
    const double BACK_D  = 5.125;   // in: back wheel offset
    const double IN_TICK = 0.01099; // in: 2.75" omni / 360 ticks

public:
    void update(double L, double R, double B, double imu_rad) {
        double dL = (L - last_L) * IN_TICK;
        double dR = (R - last_R) * IN_TICK;
        double dB = (B - last_B) * IN_TICK;
        last_L = L; last_R = R; last_B = B;

        double dTheta = (dL - dR) / TRACK;

        double dx_local, dy_local;
        if (std::abs(dTheta) < 1e-6) {
            dx_local = dB;
            dy_local = (dL + dR) * 0.5;
        } else {
            double s = 2.0 * std::sin(dTheta * 0.5);
            dy_local = s * ((dL + dR) / (2.0 * dTheta));
            dx_local = s * ((dB / dTheta) + BACK_D);
        }

        double avg = pose.theta + dTheta * 0.5;
        pose.x     += dy_local * std::sin(avg) + dx_local * std::cos(avg);
        pose.y     += dy_local * std::cos(avg) - dx_local * std::sin(avg);
        pose.theta  = imu_rad; // fuse with IMU for drift correction
    }

    Pose getPose() const { return pose; }
};`,
      },
      models: [
        { label: "Competition chassis CAD", path: "public/images/vexu/robot-cad.png" },
        { label: "Spring-loaded odometry pods", path: "public/images/vexu/intake-cad.png" },
      ],
      photos: [
        { label: "Robot at qualifier", path: "photo-1.jpg" },
        { label: "Tracking wheel assembly", path: "photo-2.jpg" },
        { label: "Team build night", path: "photo-3.jpg" },
        { label: "Autonomous field diagnostics", path: "photo-4.jpg" },
      ],
    },

    {
      slug: "fpv",
      title: "FPV Drone Engineering & Tuning",
      dates: "2023 - Present",
      context: "FPV Drone Systems",
      featured: false,
      summary:
        "Assembling and tuning freestyle quadcopters from bare frames: fine-pitch soldering, Betaflight firmware configuration, Blackbox PID log analysis, and digital video integration.",
      tags: ["Betaflight", "PID Tuning", "ESC / BLHeli_32", "DJI O4 Lite", "Soldering", "RF & Antenna"],
      links: {},
      overview: {
        intro:
          "FPV quad building is applied embedded electronics: soldering fine-pitch motor pads, configuring DSHOT ESC protocols, flashing Betaflight firmware, and iterating closed-loop PID filters against Blackbox logs. Flight builds range from 75mm indoor miniwhoops to 3\" and 5\" high-thrust freestyle platforms.",
        bullets: [
          "Build quads from bare frames up: component selection (motors, props, FC/ESC stack), soldering, and final bench test validation",
          "Configure Betaflight firmware: receiver protocol (ELRS), motor direction, ESC calibration via DSHOT300/600, and OSD layout",
          "Tune PID loops iteratively using Blackbox flight log analysis: filtering RPM noise, dialing D-term, and setting rate profiles",
          "Integrate DJI O3/O4 Lite digital video transmission with UART MSP connection for real-time OSD telemetry overlay",
          "Hold FAA Part 107 Remote Pilot Certificate; fly within all LAANC-authorized airspace requirements",
        ],
      },
      specs: [
        { label: "Primary Builds", value: "Miniwhoop 75mm, 3\" Deadcat Freestyle, 5\" X-Frame Freestyle" },
        { label: "FC / ESC Stack", value: "Mateksys 3-in-1 FC (F4 / F7 target)" },
        { label: "FPV System", value: "DJI O4 Lite (1080p @ 120fps or 4k @ 60fps, ~35ms latency with DJI Integra goggles)" },
        { label: "Radio Protocol", value: "ExpressLRS (ELRS) 2.4 GHz" },
        { label: "Data Analysis", value: "Betaflight Blackbox Explorer for PID tuning logs" },
      ],
      diagrams: [
        { label: "5\" build wiring diagram", path: "public/images/fpv/wiring.png" },
        { label: "Betaflight Blackbox PID trace", path: "public/images/fpv/blackbox.png" },
        { label: "Frequency response / RPM filter", path: "public/images/fpv/filter.png" },
      ],
      code: {
        heading: "Configuration: Betaflight CLI Dump (Rates & Filtering)",
        intro:
          "Betaflight exposes all parameters via CLI diff. This excerpt captures the PID, rate, and bidirectional DSHOT RPM filter settings dialed in through iterative Blackbox log analysis.",
        language: "bash",
        snippet: `# Betaflight 4.5 | CLI diff (5" freestyle, Mateksys F722)

# -- RC Rates (Actual rates profile) --
set roll_rc_rate = 180
set pitch_rc_rate = 180
set yaw_rc_rate = 160
set roll_expo = 20
set pitch_expo = 20
set roll_srate = 65
set pitch_srate = 65
set yaw_srate = 60

# -- PIDs --
set p_roll  = 42
set i_roll  = 85
set d_roll  = 36
set f_roll  = 120
set p_pitch = 46
set i_pitch = 90
set d_pitch = 38
set f_pitch = 125
set p_yaw   = 38
set i_yaw   = 95
set d_yaw   = 0
set f_yaw   = 100

# -- RPM Filter (requires bidirectional DSHOT) --
set dshot_bidir = ON
set rpm_filter_harmonics = 3
set rpm_filter_q = 500
set rpm_filter_min_hz = 100

# -- Dynamic Notch Filter --
set dyn_notch_count = 3
set dyn_notch_q = 250
set dyn_notch_min_hz = 80
set dyn_notch_max_hz = 600

# Motor protocol
set motor_pwm_protocol = DSHOT600`,
      },
      models: [
        { label: "5\" freestyle frame top-down", path: "public/images/fpv/frame-top.png" },
        { label: "Component stack layout", path: "public/images/fpv/stack.png" },
      ],
      photos: [
        { label: "Miniwhoop build", path: "photo-1.jpg" },
        { label: "5\" frame assembly", path: "photo-2.jpg" },
        { label: "Blackbox log analysis", path: "photo-3.jpg" },
        { label: "FPV flight shot", path: "photo-4.jpg" },
      ],
    },
  ],

  // --------------------------------------------------------------------
  // EXPERIENCE
  // --------------------------------------------------------------------
  experience: [
    {
      dateLines: ["May 2025 - Dec 2025", "May 2026 - Aug 2026"],
      title: "Controls Engineer",
      org: "Multi-Dimensional Integration, Shrewsbury, PA",
      bullets: [
        "Led a four-week on-site deployment, coordinating engineering activity and commissioning a full industrial automation installation",
        "Built and wired industrial control panels; supported PLC, HMI, and SCADA integration",
        "Developed SCADA and MES applications, scripting, and SQL connectivity across 400,000+ real-time tags",
        "Performed and supported 100+ Factory Acceptance Tests validating controls, safety interlocks, and HMI functionality",
      ],
    },
    {
      dateLines: ["Jun 2023 - Apr 2024"],
      title: "Indirect Shipping & Receiving Associate",
      org: "Cooper Standard Automotive, New Lexington, OH",
      bullets: [
        "Improved inventory accuracy by up to 35% through structured cycle counting",
        "Streamlined shipping and receiving operations, cutting lead times by 20%+",
      ],
    },
  ],

  // --------------------------------------------------------------------
  // ABOUT
  // --------------------------------------------------------------------
  about: {
    paragraphs: [
      "I am a computer engineering student at the University of Cincinnati working through an accelerated Master's + Bachelor's dual degree with a VLSI focus. I graduated valedictorian of my high school class while concurrently earning an Associate of Science.",
      "Most of what I build lives at the hardware-software boundary: custom multi-layer PCBs, C++ firmware for ARM Cortex and RP2040 microcontrollers, real-time communication protocols (CAN, SPI, I2C, USB HID), and industrial SCADA systems. I hold an FAA Part 107 Remote Pilot Certificate and a Six Sigma Black Belt.",
    ],
    hobbies: [
      "FPV Drones",
      "Home Lab / Self-Hosting",
      "Pickleball",
      "Open-Source Hardware",
      "Mechanical Keyboards",
    ],
    education: [
      {
        degree: "Accelerated M.Eng. & B.S., Computer Engineering",
        school: "University of Cincinnati | VLSI Focus",
        detail: "3.93 GPA · Expected May 2029",
      },
      {
        degree: "A.S., General Science",
        school: "Hocking College",
        detail: "3.99 GPA · 2022 - 2024",
      },
      {
        degree: "Honors Diploma",
        school: "New Lexington High School",
        detail: "Valedictorian · 4.78 GPA · 2020 - 2024",
      },
    ],
    certifications: [
      "FAA Part 107 Remote Pilot Certificate",
      "Six Sigma Black Belt | Project Management Institute (PMI)",
    ],
    skills: [
      {
        category: "Microcontrollers",
        items: ["RP2040 (Cortex-M0+)", "STM32 (Cortex-M)", "AVR", "V5 Brain"],
      },
      {
        category: "Firmware & Languages",
        items: ["Bare-Metal C++", "C", "C#", "Python", "Verilog", "SQL", "ARM Assembly"],
      },
      {
        category: "Hardware Protocols",
        items: ["CAN 2.0B / FD", "SPI", "I2C", "UART", "USB HID", "DMA", "RP2040 PIO"],
      },
      {
        category: "Hardware Design",
        items: ["KiCad", "4-Layer PCB", "Oscilloscope", "Logic Analyzer", "SMD Bring-up"],
      },
      {
        category: "Infrastructure",
        items: ["Proxmox", "Docker", "Linux", "Cloudflare", "Git", "Vivado", "CMake"],
      },
    ],
  },

  // --------------------------------------------------------------------
  // CONTACT
  // --------------------------------------------------------------------
  contact: {
    intro:
      "Open to embedded systems, firmware, and hardware engineering co-ops, internships, and full-time roles. Always happy to talk PCB layout, microcontroller firmware, or homelab infrastructure.",
  },

  // --------------------------------------------------------------------
  // PROJECTS INDEX PAGE (/projects/)
  // --------------------------------------------------------------------
  projectsPage: {
    eyebrow: "All work",
    heading: "Projects",
    intro: "Engineering builds, infrastructure, and personal hardware-software projects across embedded systems, robotics, and cloud networking.",
  },
};

export default siteData;
