import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import GoogleMaps
import GooglePlaces
import FirebaseCore
import FirebaseMessaging
import UserNotifications

@main
class AppDelegate: UIResponder, UIApplicationDelegate {

  var window: UIWindow?
  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?

  // MARK: - didFinishLaunching
  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {

    // Google Maps
    GMSServices.provideAPIKey("AIzaSyDzPgdiQDHEGO9EM2fo-yJwaBpesHl8ssk")
    GMSPlacesClient.provideAPIKey("AIzaSyDzPgdiQDHEGO9EM2fo-yJwaBpesHl8ssk")

    // Firebase
    FirebaseApp.configure()
    Messaging.messaging().delegate = self
    
    print("🔥 Firebase configurado")

    // Notificações
    UNUserNotificationCenter.current().delegate = self
    requestPushNotificationPermission(application)

    // React Native
    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    reactNativeDelegate = delegate
    reactNativeFactory = factory

    window = UIWindow(frame: UIScreen.main.bounds)

    factory.startReactNative(
      withModuleName: "petmatch",
      in: window,
      launchOptions: launchOptions
    )

    return true
  }

  // MARK: - Permissão de Notificações
  private func requestPushNotificationPermission(_ application: UIApplication) {
    let center = UNUserNotificationCenter.current()
    center.requestAuthorization(options: [.alert, .badge, .sound]) { granted, error in
      if let error = error {
        print("❌ Erro ao pedir permissão: \(error)")
        return
      }
      print("✅ Permissão concedida? \(granted)")
      
      if granted {
        DispatchQueue.main.async {
          print("📱 Registrando para notificações remotas...")
          application.registerForRemoteNotifications()
        }
      }
    }
  }
  
  // MARK: - APNs Registration
  func application(
    _ application: UIApplication,
    didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data
  ) {
    let token = deviceToken.map { String(format: "%02.2hhx", $0) }.joined()
    print("📱 APNs Token: \(token)")
    
    // Passa o token para o Firebase
    Messaging.messaging().apnsToken = deviceToken
  }
  
  func application(
    _ application: UIApplication,
    didFailToRegisterForRemoteNotificationsWithError error: Error
  ) {
    print("❌ Falha ao registrar para notificações remotas: \(error)")
  }
}


// MARK: - Firebase Messaging Token
extension AppDelegate: MessagingDelegate {
  func messaging(_ messaging: Messaging, didReceiveRegistrationToken fcmToken: String?) {
    print("🔑🔑🔑 FCM TOKEN GERADO: \(fcmToken ?? "TOKEN VAZIO")")
    
    // Enviar para NotificationCenter para JS poder capturar
    if let token = fcmToken {
      NotificationCenter.default.post(
        name: Notification.Name("FCMToken"),
        object: nil,
        userInfo: ["token": token]
      )
    }
  }
}


// MARK: - iOS Foreground Notification Handler
extension AppDelegate: UNUserNotificationCenterDelegate {

  // Recebe notificação quando o app está aberto (foreground)
  func userNotificationCenter(
    _ center: UNUserNotificationCenter,
    willPresent notification: UNNotification,
    withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void
  ) {
    completionHandler([.banner, .sound, .badge])
  }

  // Ação quando o usuário toca na notificação
  func userNotificationCenter(
    _ center: UNUserNotificationCenter,
    didReceive response: UNNotificationResponse,
    withCompletionHandler completionHandler: @escaping () -> Void
  ) {
    completionHandler()
  }
}


// MARK: - React Native Delegate
class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}
