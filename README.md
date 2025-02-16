# LeeTrack

LeeTrack is a Chrome extension designed to help you track your daily DSA (Data Structures and Algorithms) progress. Log the number of questions solved each day and visualize your progress over the month with a sleek and interactive calendar.

## Features

- **Miniature Calendar**: View the entire month in a compact, square-shaped calendar.
- **Month Navigation**: Easily navigate between months using the Previous and Next buttons.
- **Data Storage**: Record and store the number of questions solved each day.
- **Persistent Data**: Data is synchronized across all devices where the user is signed into Chrome and has the extension installed.
- **Dynamic Timer**: Countdown timer to 1 June 2025 displayed at the bottom of the popup.
- **Beautiful UI**: Aesthetic design with a black background and purple day boxes.

## Installation

Drag and drop the LeeTrack.crx file in extension page of chrome to install it directly without any hassle OR

1. **Clone the Repository**:
   ```sh
   git clone https://github.com/NiteeshL/LeeTrack.git
   cd LeeTrack
   ```

2. **Load the Extension in Chrome**:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" using the toggle switch in the top right corner
   - Click "Load unpacked" and select the `LeeTrack` folder inside your project directory

## Usage

1. Click on the extension icon in the Chrome toolbar to open the calendar popup.
2. Navigate between months using the Previous and Next buttons.
3. Click on a day to enter the number of questions solved. The data will be saved and displayed on the calendar.
4. View the countdown timer to 1 June 2025 at the bottom of the popup.

## File Structure

```
LeeTrack
├── icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── src
│   ├── styles
│   │   └── popup.css
│   ├── scripts
│   │   └── popup.js
│   ├── popup.html
├── manifest.json
└── README.md
```

## Components

- **Header**: Displays the title of the extension and navigation buttons.
- **Calendar**: Displays the days of the current month.
- **Day**: Represents an individual day in the calendar.
- **Timer**: Displays a countdown timer to 1 June 2025.

## Styles

The extension uses a custom CSS file (`popup.css`) to style the calendar with a black background and purple day boxes.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Chrome Extensions](https://developer.chrome.com/docs/extensions/)

---

Enjoy using LeeTrack! If you have any questions or feedback, feel free to open an issue or contact the maintainer.