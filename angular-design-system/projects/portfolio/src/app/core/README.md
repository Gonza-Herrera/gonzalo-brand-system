# Core

Application-wide configuration and infrastructure belong here when they have a real consumer.
The current foundation keeps only stable site metadata in `config/`; browser-safe theme behavior
continues to come from the public `GhThemeService` instead of an application wrapper.

Future analytics, SEO and platform integrations must remain SSR-safe and should not introduce
global state until the application requires it.
