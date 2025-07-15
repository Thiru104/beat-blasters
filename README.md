# BEAT BUSTERS DANCE CENTER - Website

A modern, responsive one-page website for Beat Busters Dance Center featuring dance programs, art classes, fitness programs, and additional services.

## 🎯 Features

### Design & User Experience
- **Modern Design**: Red, black, and white color theme
- **Responsive Layout**: Fully responsive using Bootstrap 5
- **Smooth Animations**: AOS (Animate On Scroll) library integration
- **Interactive Elements**: Hover effects, smooth scrolling, and dynamic navigation
- **Mobile-First**: Optimized for all device sizes

### Sections
1. **Hero Section**: Bold title with animated dance silhouettes
2. **Dance Programs**: Western, Bollywood, Hip Hop, B-Boying, Popping & Locking, Folk Dance, Bharatanatyam
3. **Art Programs**: Sketching, Abacus, Painting, Water Colouring
4. **Fitness Programs**: Aerobics, Zumba, Martial Art, Artistic Yoga
5. **Additional Services**: Movie, Ad Shoot, Corporate Choreography, Dance Events, Wedding & Sangeeth, Dance Concerts, YouTube Choreography
6. **Contact Section**: Phone numbers, address, and contact form
7. **Footer**: Copyright and branding

### Technical Features
- **Form Validation**: Client-side and server-side validation
- **Email Integration**: PHPMailer for contact form submissions
- **Auto-Reply**: Automated thank you emails to customers
- **Error Handling**: Comprehensive error logging and user feedback
- **Performance**: Optimized loading and smooth interactions

## 🚀 Quick Start

### Prerequisites
- XAMPP (or any local PHP server)
- PHP 7.4 or higher
- Composer (for PHPMailer)

### Installation

1. **Clone/Download the project**
   ```bash
   # Place the files in your XAMPP htdocs directory
   C:\xampp\htdocs\ABCD\
   ```

2. **Install PHPMailer dependencies**
   ```bash
   composer install
   ```

3. **Configure Email Settings**
   - Open `php/sendmail.php`
   - Update the following settings:
     ```php
     $mail->Host = 'smtp.gmail.com'; // Your SMTP server
     $mail->Username = 'your-email@gmail.com'; // Your email
     $mail->Password = 'your-app-password'; // Your app password
     $mail->addAddress('beatbusters@gmail.com', 'Beat Busters Dance Center'); // Recipient email
     ```

4. **Start XAMPP**
   - Start Apache server
   - Navigate to `http://localhost/ABCD/`

## 📧 Email Configuration

### Gmail Setup (Recommended)
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. Use the generated password in the PHP file

### Alternative Email Providers
- **Outlook/Hotmail**: Use `smtp-mail.outlook.com` on port 587
- **Yahoo**: Use `smtp.mail.yahoo.com` on port 587
- **Custom SMTP**: Update host, port, and credentials accordingly

## 📁 File Structure

```
ABCD/
├── index.html              # Main website file
├── css/
│   └── styles.css         # Custom styles and animations
├── js/
│   └── scripts.js         # JavaScript functionality
├── php/
│   └── sendmail.php       # Contact form handler
├── logs/                  # Log files directory
├── vendor/                # Composer dependencies
├── PHPMailer/            # PHPMailer library
└── README.md             # This file
```

## 🎨 Customization

### Colors
The website uses CSS custom properties for easy color customization:
```css
:root {
    --primary-red: #e63946;
    --primary-black: #000;
    --primary-white: #fff;
    --secondary-red: #dc3545;
}
```

### Content Updates
- **Programs**: Edit the HTML sections in `index.html`
- **Contact Info**: Update phone numbers and address in the contact section
- **Services**: Modify the services section as needed

### Styling
- **Animations**: Modify AOS attributes in HTML or CSS
- **Layout**: Adjust Bootstrap classes and custom CSS
- **Typography**: Change Google Fonts import in HTML

## 🔧 Configuration

### PHP Settings
- **Error Reporting**: Disable in production by commenting out error_reporting lines
- **CORS**: Configure for your domain in production
- **SMTP**: Update email settings for your provider

### JavaScript Features
- **Form Validation**: Client-side validation in `scripts.js`
- **Smooth Scrolling**: Navigation and button click handling
- **Animations**: AOS initialization and custom effects
- **Responsive**: Mobile-friendly interactions

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🛠️ Troubleshooting

### Common Issues

1. **Email not sending**
   - Check SMTP settings in `php/sendmail.php`
   - Verify email credentials
   - Check server logs in `logs/error.log`

2. **Form not working**
   - Ensure Apache and PHP are running
   - Check browser console for JavaScript errors
   - Verify file permissions

3. **Styling issues**
   - Clear browser cache
   - Check CSS file path
   - Verify Bootstrap CDN links

4. **Animations not working**
   - Check AOS library loading
   - Verify data-aos attributes in HTML
   - Check JavaScript console for errors

### Log Files
- `logs/contact_form.log`: Successful form submissions
- `logs/error.log`: PHP errors and exceptions

## 🔒 Security Considerations

### Production Deployment
1. **Disable Error Reporting**
   ```php
   // Comment out or remove these lines
   // error_reporting(E_ALL);
   // ini_set('display_errors', 1);
   ```

2. **Configure CORS**
   ```php
   // Replace * with your domain
   header('Access-Control-Allow-Origin: https://yourdomain.com');
   ```

3. **Secure Email Configuration**
   - Use environment variables for sensitive data
   - Implement rate limiting
   - Add CAPTCHA protection

4. **File Permissions**
   - Set appropriate permissions for logs directory
   - Restrict access to sensitive files

## 📈 Performance Optimization

### Recommendations
1. **Image Optimization**: Compress and optimize images
2. **CDN Usage**: Use CDN for external libraries
3. **Caching**: Implement browser caching
4. **Minification**: Minify CSS and JavaScript files
5. **Gzip Compression**: Enable server-side compression

## 🎯 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+

## 📞 Support

For technical support or customization requests:
- Check the logs directory for error information
- Review browser console for JavaScript errors
- Verify server configuration and permissions

## 📄 License

This project is created for Beat Busters Dance Center. All rights reserved.

---

**Created with ❤️ for Beat Busters Dance Center** 