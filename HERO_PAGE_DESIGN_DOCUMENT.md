# Hero Page Design Document

## SWAPPED - iPhone Trade-In Platform

### **Executive Summary**

This document outlines the design strategy, requirements, and thought process for the SWAPPED hero page - a landing page for an iPhone trade-in service that emphasizes simplicity, trust, and Apple-inspired aesthetics.

---

## **Core Objectives**

### **Primary Goals**

1. **Immediate Value Proposition**: Communicate the service benefit within 3 seconds
2. **Trust Building**: Establish credibility through professional design and clear messaging
3. **User Action**: Drive visitors to start the trade-in process
4. **Brand Positioning**: Position SWAPPED as the premium iPhone swap service

### **Success Metrics**

- Click-through rate to `/tradein` page
- Time spent on page (target: 30+ seconds)
- Bounce rate (target: <40%)
- Mobile conversion rate parity with desktop

---

## **Design Philosophy**

### **Apple-Inspired Principles**

- **Simplicity Over Complexity**: Clean, uncluttered interface
- **Typography as Art**: Bold, readable fonts with proper hierarchy
- **White Space**: Generous spacing for breathing room
- **Premium Feel**: High-quality visuals and smooth animations
- **User-Centric**: Focus on user needs, not company features

### **Visual Language**

- **Motion**: Purposeful animations that enhance understanding
- **Layout**: Centered, symmetrical composition

---

## **Hero Page Requirements**

### **1. Navigation Bar**

**Purpose**: Minimal navigation to reduce cognitive load

**Requirements**:

- Fixed position with glassmorphism effect
- SWAPPED logo/brand name (left)
- Single CTA button "Get Started" (right)
- Responsive collapse on mobile
- Subtle border and backdrop blur

**Design Rationale**:
Users should focus on the hero message, not navigation options. Single CTA reduces decision paralysis.

### **2. Hero Section**

**Purpose**: Primary conversion area - communicate value and drive action

**Requirements**:

#### **Headline**

- Large, bold typography (6xl-8xl responsive)
- Two-part message:
  - "Trade in your iPhone." 
  - "Upgrade with ease."

#### **Subheadline**

- Supporting copy explaining the value proposition
- Color: Gray-600 for hierarchy
- Font weight: Light (300) for contrast
- Max width: 4xl for readability

#### **Call-to-Action Buttons**

- Primary: "Start Your Trade-In" ( prominent)
- Secondary: "Learn More" (outlined, subtle)
- Rounded corners (full)
- Hover effects: scale and color transitions
- Generous padding for touch targets

#### **Visual Animation**

- iPhone swap sequence showing the core service

#### **Interactive Elements**

- Button hover states: subtle scale (1.05) and color shifts
- Link hover states: color transitions (300ms)
- Smooth transitions for all interactive elements

---

## **Typography Hierarchy**

### **Font Stack**

```css
font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
```

### **Type Scale**

1. **Hero Headline**: 6xl-8xl (60px-96px)
2. **Subheadline**: xl-2xl (20px-24px)
3. **Button Text**: lg (18px)
4. **Navigation**: base (16px)
5. **Footer Headings**: lg (18px)
6. **Footer Links**: base (16px)

### **Font Weights**

- **Black (900)**: Hero headline primary text
- **Bold (700)**: Section headings, button text
- **Semibold (600)**: Navigation links
- **Medium (500)**: Footer headings
- **Light (300)**: Subheadline, body text

---

## **Footer Section**

### **Purpose**

Build trust, provide essential information, maintain professional appearance

### **Requirements**

#### **Brand Section** (2 columns)

- Large SWAPPED logo/name
- Company description (trust-building copy)
- Social media icons (email, phone, Twitter)
- Professional tone, light font weight

#### **Services Section**

- Clear service offerings
- Links to key pages
- Hover states for interactivity

#### **Support Section**

- Help and contact information
- Shipping and FAQ links
- Customer service focus

#### **Legal Section**

- Copyright notice
- Privacy policy and terms links
- Horizontal layout on desktop

---

## **Technical Implementation**

### **Performance Requirements**

- **First Contentful Paint**: <1.5 seconds
- **Largest Contentful Paint**: <2.5 seconds
- **Cumulative Layout Shift**: <0.1
- **Animation Frame Rate**: 60fps

### **Accessibility Standards**

- WCAG 2.1 AA compliance
- Proper heading hierarchy (h1, h2, h3)
- Alt text for decorative elements
- Keyboard navigation support
- Color contrast ratio: 4.5:1 minimum

### **Responsive Breakpoints**

- **Mobile**: <640px (sm)
- **Tablet**: 640px-1024px (md-lg)
- **Desktop**: >1024px (xl+)

### **Animation Considerations**

- Respect `prefers-reduced-motion` setting
- Graceful degradation for older browsers
- Pause animations on page visibility change
- Smooth performance on mobile devices

---

## **Content Strategy**

### **Messaging Principles**

1. **Benefit-Focused**: Lead with user value, not features
2. **Trust-Building**: Use reassuring language ("expert inspection", "fair prices")
3. **Action-Oriented**: Clear, imperative CTAs
4. **Conversational**: Approachable tone while maintaining professionalism

### **Key Messages**

- **Primary**: "Trade in your iPhone. Upgrade with ease."
- **Value Props**: "Fair prices, expert inspection, seamless process"
- **Trust Signals**: "Thousands of satisfied customers"
- **Process**: "Instant estimate, certified devices, immediate exchange"

---

## **Design System Elements**

---

## **User Experience Considerations**

### **Cognitive Load Reduction**

- Single primary action per section
- Minimal navigation options
- Clear visual hierarchy
- Predictable interaction patterns

### **Trust Building Elements**

- Professional typography and spacing
- Smooth, polished animations
- Consistent brand presentation
- Clear value proposition

### **Mobile-First Approach**

- Touch-friendly button sizes (44px minimum)
- Readable text without zoom
- Simplified navigation on small screens
- Optimized animation performance

---

## **Success Criteria**

### **Immediate (Launch)**

- Page loads without errors
- Animations run smoothly on all devices
- All interactive elements respond correctly
- Mobile experience matches desktop quality

### **Short-term (1-4 weeks)**

- User engagement metrics improve
- Trade-in funnel entry rate increases
- Positive user feedback on design
- Low bounce rate maintenance

### **Long-term (1-3 months)**

- Conversion rate optimization through A/B testing
- User behavior analysis for further improvements
- Brand recognition and trust metrics
- Competitive positioning validation

---

## **Future Iterations**

### **Potential Enhancements**

- **Personalization**: Dynamic content based on user location/preferences
- **Social Proof**: Customer testimonials and success stories
- **Interactive Elements**: Device selection preview
- **Progressive Disclosure**: Expandable information sections

### **A/B Testing Opportunities**

- CTA button text variations
- Headline messaging alternatives
- Animation timing and style
- Color scheme variations

---

**Document Version**: 1.0  
**Last Updated**: December 22, 2025  
**Author**: GitHub Copilot  
**Review Status**: Initial Draft
