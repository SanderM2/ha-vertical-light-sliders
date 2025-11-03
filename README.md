# HA Vertical Light Sliders KNUTS by SanderM2

[![GitHub Release][releases-shield]][releases]
[![License][license-shield]](LICENSE.md)
[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg?style=for-the-badge)](https://github.com/hacs/integration)

![Project Maintenance][maintenance-shield]

A beautiful and customizable Home Assistant Lovelace card for controlling lights with vertical sliders. Features real-time brightness control, dynamic color themes, and smooth animations.

## ✨ Features

- 🎚️ **Vertical brightness sliders** - Intuitive light control
- 🎨 **Dynamic colors** - Different colors for 0% vs active brightness levels
- 🌓 **Theme aware** - Automatic dark/light mode support  
- 📱 **Mobile optimized** - Touch-friendly interactions
- ⚡ **Real-time updates** - Instant visual feedback during sliding
- 🔄 **External sync** - Seamless integration with HA automations
- 🎯 **Light-only focus** - Optimized specifically for light entities

## 🚀 Installation

### HACS (Recommended)

1. Open HACS in your Home Assistant
2. Go to "Frontend" section  
3. Click the "+" button
4. Search for "HA Vertical Light Sliders KNUTS"
5. Install the card
6. Add the resource to your Lovelace resources

### Manual Installation

1. Download `ha-vertical-light-sliders.js`
2. Copy it to your `www` folder in Home Assistant
3. Add the resource to your Lovelace resources:
   ```yaml
   resources:
     - url: /local/ha-vertical-light-sliders.js
       type: module
   ```

## 📝 Configuration

### Basic Example
```yaml
type: custom:ha-vertical-light-sliders
title: "Living Room Lights"
entities:
  - entity: light.living_room_main
  - entity: light.living_room_accent
  - entity: light.kitchen_island
```

### Advanced Example
```yaml
type: custom:ha-vertical-light-sliders
title: "House Lighting"
icon: mdi:lightbulb-group
showSidebar: true
showButton: true
buttonText: "Dashboard" 
buttonPath: "/lovelace/0"
entities:
  - entity: light.living_room
  - entity: light.bedroom
  - entity: light.kitchen
closedColor: "var(--bg-color-inactive)"
openColor: "var(--accent-color)"
```

## ⚙️ Configuration Options

| Name                           | Type    | Requirement  | Description                                            | Default                |
| ------------------------------ | ------- | ------------ | ------------------------------------------------------ | ---------------------- |
| type                           | string  | **Required** | `custom:ha-vertical-light-sliders`                    |                        |
| title                          | string  | **Required** | Title to show in sidebar                               |                        |
| entities                       | list    | **Required** | Light entities to show as sliders in card             |                        |
| &nbsp;&nbsp;- entity           | string  | **Required** | Light's `entity_id`                                    | &nbsp;                 |
| &nbsp;&nbsp;- script           | string  | **Optional** | Script to call when light value changes               | &nbsp;                 |

### 🎨 Styling Options

| Name                           | Type    | Requirement  | Description                                            | Default                |
| ------------------------------ | ------- | ------------ | ------------------------------------------------------ | ---------------------- |
| **Sidebar** area               |         |              |                                                        |                        |
| icon                           | string  | **Optional** | Icon to show in sidebar                                | `mdi:lightbulb-group`  |
| iconSize                       | string  | **Optional** | Size of icon in sidebar                                | `28px`                 |
| iconColor                      | string  | **Optional** | Color of icon in sidebar                               | `--primary-text-color` |
| titleSize                      | string  | **Optional** | Size of title text in sidebar                         | `40px`                 |
| titleFontColor                 | string  | **Optional** | Color of title text in sidebar                        | `--primary-text-color` |
| countText                      | string  | **Optional** | Text to show after number of lights on                | `lights on`            |
| countTextFontColor             | string  | **Optional** | Color of count text in sidebar                        | `--primary-text-color` |
| closedBaseline                 | number  | **Optional** | Brightness level considered as "on"                   | `0`                    |

### 🎚️ Slider Options

| Name                           | Type    | Requirement  | Description                                            | Default                |
| ------------------------------ | ------- | ------------ | ------------------------------------------------------ | ---------------------- |
| **Light** area                 |         |              |                                                        |                        |
| positionWidth                  | string  | **Optional** | Width of light slider                                  | `100px`                |
| positionHeight                 | string  | **Optional** | Height of light slider                                 | `300px`                |
| gapWidth                       | string  | **Optional** | Width of space between sliders                        | `50px`                 |
| showSwitch                     | boolean | **Optional** | Show ON/OFF switch under every light                  | `true`                 |
| switchWidth                    | string  | **Optional** | Width of switch button                                 | same as positionWidth  |
| switchHeight                   | string  | **Optional** | Height of switch button                                | same as switchWidth    |
| switchFontColor                | string  | **Optional** | Color of switch text                                   | `--primary-text-color` |
| showName                       | boolean | **Optional** | Show/hide the name of light                           | `true`                 |
| showPosition                   | boolean | **Optional** | Show/hide the brightness number                       | `true`                 |

### 🎨 Color Options

| Name                           | Type    | Requirement  | Description                                            | Default                |
| ------------------------------ | ------- | ------------ | ------------------------------------------------------ | ---------------------- |
| **Color** options              |         |              |                                                        |                        |
| closedColor                    | string  | **Optional** | Color for 0% brightness (off state)                   | `var(--bg-color-inactive)` |
| closedColor2                   | string  | **Optional** | Color for >= 1% brightness                            | `hsl(0, 0%, 40%)`      |
| openColor                      | string  | **Optional** | Color for active part of slider                       | `hsl(0, 0%, 90%, 0.6)` |
| switchColor                    | string  | **Optional** | Color of switch background                             | same as sideColor2     |

### 🏠 Layout Options

| Name                           | Type    | Requirement  | Description                                            | Default                |
| ------------------------------ | ------- | ------------ | ------------------------------------------------------ | ---------------------- |
| **Layout** options             |         |              |                                                        |                        |
| panelType                      | boolean | **Optional** | Enable panel mode (responsive layout)                 | `false`                |
| showSidebar                    | boolean | **Optional** | Show/hide sidebar completely                          | `true`                 |
| sidebarWidth                   | string  | **Optional** | Width of sidebar                                       | `300px`                |
| sidebarMinWidth                | string  | **Optional** | Minimum width of sidebar                               | `200px`                |
| sideColor1                     | string  | **Optional** | Top color of sidebar gradient                          | `#ffcccc`              |
| sideColor2                     | string  | **Optional** | Bottom color of sidebar gradient                       | `#b30000`              |
| background                     | string  | **Optional** | Background color of entire card                        | `transparent`          |
| showButton                     | boolean | **Optional** | Show navigation button in sidebar                      | `false`                |
| buttonText                     | string  | **Optional** | Text on navigation button                              | `Home`                 |
| buttonPath                     | string  | **Optional** | Path to navigate to when button clicked               | `/lovelace/0`          |
| buttonService                  | string  | **Optional** | Service to call instead of navigation                 |                        |
| buttonData                     | string  | **Optional** | Data for service call                                  |                        |
| buttonFontColor                | string  | **Optional** | Color of button text                                   | `--primary-text-color` |

## 🎨 Theme Support

This card automatically adapts to your Home Assistant theme:

- **Light Mode**: Optimized colors and contrast for light themes
- **Dark Mode**: Automatically adjusts opacity and colors for dark themes  
- **Custom Themes**: Uses theme CSS variables for consistent styling

The card uses `var(--bg-color-inactive)` by default, which automatically provides the correct colors for both light and dark modes, matching other Home Assistant components like Mushroom cards.

## 💡 For Lights

Your lights should support the standard Home Assistant light services:
- `light.turn_on` with brightness parameter
- `light.turn_off`

The card works with any light entity that supports brightness control.

## 🎯 Usage Tips

1. **Real-time feedback**: The sliders show immediate visual feedback while dragging
2. **External updates**: If lights are changed via other methods, sliders update automatically  
3. **Touch friendly**: Optimized for both desktop and mobile use
4. **Theme matching**: Colors automatically match your HA theme
5. **Performance**: Smooth animations without impacting system performance

## 📱 Responsive Design

The card adapts to different screen sizes:
- **Desktop**: Full sidebar with sliders  
- **Tablet**: Responsive layout with panel mode
- **Mobile**: Optimized touch targets and spacing

## 🔧 Troubleshooting

### Sliders not visible
- Check that `closedColor` has enough contrast with your background
- Try using `var(--bg-color-inactive)` for automatic theme colors

### Lights not responding  
- Verify light entities support brightness control
- Check Home Assistant logs for service call errors

### Theme colors not working
- Ensure you're using CSS variables like `var(--bg-color-inactive)`
- Clear browser cache after theme changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits

Originally based on the vertical slider cover card concept. Completely rewritten and optimized specifically for Home Assistant light control.

---

**Repository**: https://github.com/SanderM2/ha-vertical-light-sliders

[releases-shield]: https://img.shields.io/github/release/SanderM2/ha-vertical-light-sliders.svg?style=for-the-badge
[releases]: https://github.com/SanderM2/ha-vertical-light-sliders/releases
[license-shield]: https://img.shields.io/github/license/SanderM2/ha-vertical-light-sliders.svg?style=for-the-badge  
[maintenance-shield]: https://img.shields.io/badge/maintainer-SanderM2-blue.svg?style=for-the-badge
  - entity: light.living_room_accent
  - entity: light.kitchen_counter
```

### Advanced Example
```yaml
type: custom:ha-vertical-light-sliders
title: "Bedroom Lights"
entities:
  - entity: light.bedroom_main
  - entity: light.bedroom_bedside_left
  - entity: light.bedroom_bedside_right
# Colors
closedColor: "hsl(0, 0%, 15%)"     # Color for 0% brightness
closedColor2: "hsl(0, 0%, 35%)"    # Color for 1%+ brightness  
openColor: "hsl(45, 100%, 70%)"    # Color for slider progress
sideColor1: "#ffcc66"              # Sidebar gradient start
sideColor2: "#ff9900"              # Sidebar gradient end
# Layout
positionWidth: "120px"
positionHeight: "350px"
showPosition: true
showSwitch: true
panelType: false
showSidebar: true
# Button (optional)
showButton: true
buttonText: "All Off"
buttonService: "light.turn_off"
buttonData: "light.bedroom_group"
```

## ⚙️ Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | string | **Required** | Card title |
| `entities` | list | **Required** | List of light entities |
| `closedColor` | string | `hsl(0, 0%, 20%)` | Slider color at 0% brightness |
| `closedColor2` | string | `hsl(0, 0%, 40%)` | Slider color at 1%+ brightness |
| `openColor` | string | `hsl(0, 0%, 90%, 0.6)` | Active slider progress color |
| `sideColor1` | string | `#ffcccc` | Sidebar gradient start color |
| `sideColor2` | string | `#b30000` | Sidebar gradient end color |
| `positionWidth` | string | `100px` | Slider width |
| `positionHeight` | string | `300px` | Slider height |
| `showPosition` | boolean | `true` | Show brightness percentage |
| `showSwitch` | boolean | `false` | Show on/off toggle buttons |
| `showSidebar` | boolean | `true` | Show sidebar with title/info |
| `panelType` | boolean | `false` | Use panel mode layout |
| `background` | string | `transparent` | Card background color |

### Button Options
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `showButton` | boolean | `false` | Show action button |
| `buttonText` | string | `Home` | Button text |
| `buttonPath` | string | `/lovelace/0` | Navigation path |
| `buttonService` | string | - | Service to call |
| `buttonData` | string | - | Service data |

## 🎨 Color Themes

The card supports dynamic color theming:

- **closedColor**: Used when brightness is 0%
- **closedColor2**: Used when brightness is 1% or higher
- **openColor**: Shows the active progress on the slider

Example dark theme:
```yaml
closedColor: "hsl(0, 0%, 15%)"
closedColor2: "hsl(0, 0%, 35%)"
openColor: "hsl(45, 100%, 70%)"
```

Example light theme:
```yaml
closedColor: "hsl(0, 0%, 80%)"
closedColor2: "hsl(0, 0%, 60%)"
openColor: "hsl(200, 100%, 50%)"
```

## 🔧 Usage in Lovelace

### Card Mode
```yaml
- type: custom:ha-vertical-light-sliders
  title: "Kitchen Lights"
  entities:
    - entity: light.kitchen_main
    - entity: light.kitchen_under_cabinet
```

### Panel Mode  
```yaml
- type: custom:ha-vertical-light-sliders
  title: "All House Lights"
  panelType: true
  entities:
    - entity: light.living_room
    - entity: light.kitchen
    - entity: light.bedroom
    - entity: light.bathroom
```

## 🐛 Troubleshooting

### Card not loading
- Ensure the resource is added to Lovelace resources
- Check browser console for JavaScript errors
- Verify the file path is correct

### Sliders not responding
- Check that entities are valid light entities
- Ensure lights support brightness control
- Verify Home Assistant connection

### Colors not applying
- Use proper CSS color format (hex, hsl, rgb)
- Check for typos in color property names
- Test with default colors first

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits

- Based on the original work by [DBuit](https://github.com/DBuit/hass-smart-home-panel-card)
- Developed and enhanced by [SanderM2](https://github.com/SanderM2)

## 🔗 Links

- [GitHub Repository](https://github.com/SanderM2/ha-vertical-light-sliders)
- [Home Assistant Community](https://community.home-assistant.io)

[releases-shield]: https://img.shields.io/github/release/SanderM2/ha-vertical-light-sliders.svg?style=for-the-badge
[releases]: https://github.com/SanderM2/ha-vertical-light-sliders/releases
[license-shield]: https://img.shields.io/github/license/SanderM2/ha-vertical-light-sliders.svg?style=for-the-badge
[maintenance-shield]: https://img.shields.io/badge/maintainer-SanderM2-blue.svg?style=for-the-badge

![card screenshot](https://github.com/SanderM2/lovelace-vertical-slider-cover-card/blob/master/src/konnected_vn_vertical-slider-cover-card-color-guideline.png?raw=true "Desktop screenshot")


Color Picker Helper (Google)

![card screenshot](https://github.com/SanderM2/lovelace-vertical-slider-cover-card/blob/master/src/konnected_vn_color_picker.png?raw=true "Desktop screenshot")

## MINIMUM REQUIREMENTS

### For Covers:
Your covers have to support `close_cover`, `open_cover` and `set_cover_position` services.
Normally, this means `attributes.supported_features` is at least 7 or greater.

### For Lights:
Your lights should support brightness control for slider functionality.
This means `attributes.supported_features` should include brightness support (bit 1).


# Options

| Name                           | Type    | Requirement  | Description                                            | Default                |
| ------------------------------ | ------- | ------------ | ------------------------------------------------------ | ---------------------- |
| type                           | string  | **Required** | `custom:vertical-slider-cover-card-knuts`              |                        |
| title                          | string  | **Required** | Title                                                  |                        |
| entities                       | list    | **Required** | Cover/Light entities to show as slider in card        |                        |
| &nbsp;&nbsp;- entity           | string  | **Required** | Cover's or Light's `entity_id`                        | &nbsp;                 |
| &nbsp;&nbsp;&nbsp;&nbsp;name   | string  | **Optional** | Custom name for every entity                           | `friendly_name`        |
| &nbsp;&nbsp;&nbsp;&nbsp;script | string  | **Optional** | Call additional script on every position change (3)    | `null`                 |
| **Sidebar** area               |         |              |                                                        |                        |
| showSidebar                    | boolean | **Optional** | Show or hide side bar (1)                              | `true`                 |
| sideColor1                     | string  | **Optional** | Upper-left color of sidebar (~)                        | `#ffcccc`              |
| sideColor2                     | string  | **Optional** | Lower-right color of sidebar (~)                       | `#b30000`              |
| icon                           | string  | **Optional** | Icon to show on side bar (auto-detected by default)   | auto                   |
| iconSize                       | string  | **Optional** | Font size of icon on side bar                          | `28px`                 |
| iconColor                      | string  | **Optional** | Color of icon on side bar                              | theme                  |
| titleSize                      | string  | **Optional** | Font size of title                                     | `40px`                 |
| titleFontColor                 | string  | **Optional** | Font color of title                                    | theme                  |
| countText                      | string  | **Optional** | Text to show follow number of covers open              | `covers open`          |
| countTextFontColor             | string  | **Optional** | Font color of text to show follow number               | theme                  |
| showButton                     | boolean | **Optional** | Show Home button at bottom of side bar                 | `false`                |
| closedBaseline                 | byte    | **Optional** | Cover with positon higher is counted as open           | `0`                |
| buttonText                     | string  | **Optional** | Text to show on button                                 | `Home`                 |
| buttonFontColor                | string  | **Optional** | Font color of button                                   | theme                  |
| buttonPath                     | string  | **Optional** | Path of Lovelace View when click button                | `/lovelace/0`          |
| buttonService                  | string  | **Optional** | Service to call (overide buttonPath if any)            | `null`                 |
| buttonData                     | string  | **Optional** | Service data to call                                   | `null`                 |
| **Cover** area                 |         |              |                                                        |                        |
| background                     | string  | **Optional** | Card background in hex (# or hsl with opacity)         | `transparent`          |
| panelType                      | boolean | **Optional** | Try to center all sliders (`gapWidth` will be ignored) | `true`                 |
| gapWidth                       | string  | **Optional** | Width of Space between 2 cover sliders                 | `50px`                 |
| positionHeight                 | string  | **Optional** | Height of each slider in px                            | `300px`                |
| positionWidth                  | string  | **Optional** | Width of each slider in px                             | `100px`                |
| openColor                      | string  | **Optional** | Color of lower slider bar (~)                          | `hsl(0, 0%, 90%, 0.8)` |
| closedColor                    | string  | **Optional** | Color of upper slider bar at 0% (~)                    | `hsl(0, 0%, 20%)`      |
| closedColor2                   | string  | **Optional** | Color of upper slider bar at >= 1% (~)                 | `hsl(0, 0%, 40%)`      |
| openBaseline                   | integer | **Optional** | (2)                                                    | `0`                    |
| showSwitch                     | boolean | **Optional** | Show STOP switch under every covers                    | `true`                 |
| switchWidth                    | string  | **Optional** | Width of Stop button at bottom                         | `positionWidth`        |
| switchHeight                   | string  | **Optional** | Height of Stop button at bottom                        | `switchWidth`          |
| switchColor                    | string  | **Optional** | Background color of Stop button (~)                    | `sideColor2`           |
| switchFontColor                | string  | **Optional** | Font color of Stop button at bottom                    | theme                  |
| showName                       | boolean | **Optional** | Show/hide the name of cover                            | `true`                 |
| showPosition                   | boolean | **Optional** | Show/hide the position (number) of cover               | `true`                 |

## STARTING A NEW CARD

### INSTALL USING HACS (recommended)

<del>Add this repo to HACS custom repositories.</del>
Card is in HACS default.

**repo**: https://github.com/SanderM2/lovelace-vertical-slider-cover-card

*Category*: Frontend

Hướng dẫn cài đặt và sử dụng HACS trong Home Assistant có thể xem ở đây (VI - HACS Guide):
https://konnected.vn/home-assistant/home-assistant-cai-dat-hacs-va-theme-2020-03-27

### MANUAL INSTALL

Download vertical-slider-cover-card-knuts.js and add it to your /config/wwww/vertical-slider-cover-card-knuts (make new dir if it does not exist).

In Home Assistant Dashboard **Resource**, add resource path /local/vertical-slider-cover-card-knuts/vertical-slider-cover-card-knuts.js, type: module.

`resources`:
```yaml
- url: /local/vertical-slider-cover-card-knuts/vertical-slider-cover-card-knuts.js
  type: module
```

### ADD NEW CARD

In Lovelace, add new Manual card. Replace new card content with sample configuration below. Change the entities.

In View option, check Panel mode if you want do display card in full width.

#example configuration

##minimum configuration

```yaml
type: 'custom:vertical-slider-cover-card-knuts'
title: Garage
entities:
- entity: cover.garage_shutter
```

##lights example

```yaml
type: 'custom:vertical-slider-cover-card-knuts'
title: Living Room Lights
entities:
- entity: light.living_room_main
- entity: light.living_room_accent
- entity: light.table_lamp
```

##mixed covers and lights

```yaml
type: 'custom:vertical-slider-cover-card-knuts'
title: Living Room
entities:
- entity: cover.living_room_blinds
  name: Blinds
- entity: light.living_room_main
  name: Main Light
- entity: light.table_lamp
  name: Table Lamp
```

##more customized

```yaml
type: 'custom:vertical-slider-cover-card-knuts'
background: 'rgba(0, 0, 0, 0.4)'
showButton: true
buttonPath: /lovelace/0
buttonText: Home
#Call service instead of navigating -> comment 1 line above & uncomment all belows
#buttonText: CLOSE
#buttonService: cover.close_cover
#buttonData: 'cover.office_left_blinds,cover.office_right_blinds,cover.basement_shutter'
countText: 'covers open'
closedBaseline: 5
icon: 'mdi:blinds'
iconSize: 40px
panelType: true
showSidebar: true
positionHeight: 300px
positionWidth: 100px
gapWidth: 50px
switchHeight: 80px
switchWidth: 100px
showSwitch: true
sideColor1: '#ffcccc'
sideColor2: '#b30000'
openColor: 'hsl(0, 0%, 20%, 0.8)'
closedColor: 'hsl(0, 0%, 90%)'
title: Covers
titleSize: 40px
entities:
  - entity: cover.office_left_blinds
    name: Left Blinds
  - entity: cover.office_right_blinds
    name: Right Blinds
  - entity: cover.basement_shutter
    name: Basement Shutter
    script: script.disable_alarm_for_5_min
```

**(1)** You might want to hide side bar (showSidebar: false) to have 2 or 3 covers in same card on mobile.

**(2)** openBaseline - some covers stop at position 2 or 1 instead of 0. When set, any cover with current_position
greater than *openBaseline* will be counted as open.

**(3)** when declared, script will be called *simutaneously* with `cover.set_position` service (which is used to set cover to desired position). You might want to use this script option to, for example, temporarily disable mid-night open door alarm.

Example of script:

```yaml
disable_alarm_for_5_min:
  alias: Disarm alarm panel for 5 mins
  mode: single
  sequence: #Home Assistant >= 0.113
  #try to save current state of alarm_panel
  - service: scene.create
    data:
      scene_id: door_alarm_panel_state
      snapshot_entities:
      - alarm_control_panel.door_alarm
  - data: {}
    entity_id: alarm_control_panel.door_alarm
    service: alarm_control_panel.alarm_disarm
  - delay: '00:05:00'
  #set it back
  - scene: scene.door_alarm_panel_state
  icon: mdi:alarm-note-off
```



## ISSUE AND SUGGESTION?

Customize to suit your needs and contribute it back to the community.

Found issue? Please raise an issue in this repository or send me email to <duytruong@konnected.vn>

Any suggestion and comment are warmly welcome and appreciated!

### MIGHT NOT WORK ON FIREFOX

Have some appearance issues on Firefox. Please try with caution!

## MORE WORKS TO DO

1. Change hard-coded styles and clean codes (done somehow)

2. Remove unnecessary css and js blocks

3. Support input_number and light entities in Home Assistant

### Many Thanks to DBuit!

This card is based on his lights-card at: https://github.com/DBuit/hass-smart-home-panel-card.

## Support (just for fun!)

Hey dude! Help me out for a couple of :beers: or a :coffee: (:coffee: is preferred, have enough beers this year)!

[![coffee](https://www.buymeacoffee.com/assets/img/custom_images/black_img.png)](https://www.buymeacoffee.com/wolverinevn)

[maintenance-shield]: https://img.shields.io/maintenance/yes/2020.svg?style=for-the-badge
[twitter]: https://twitter.com/KonnectedVN
[site]: https://konnected.vn/home-assistant
[license-shield]: https://img.shields.io/github/license/SanderM2/lovelace-vertical-slider-cover-card.svg?style=for-the-badge&color=red
[maintenance-shield]: https://img.shields.io/maintenance/yes/2020.svg?style=for-the-badge
[releases-shield]: https://img.shields.io/github/v/release/SanderM2/lovelace-vertical-slider-cover-card.svg?style=for-the-badge&color=red
[releases]: https://github.com/SanderM2/lovelace-vertical-slider-cover-card/releases
