// src/styles.ts
import { StyleSheet } from 'react-native';

export const colors = {
  bg: '#f7fafc',
  card: '#ffffff',
  muted: '#6b7280',
  accent1: '#bfe9d7', // mint
  accent2: '#cde7ff', // soft blue
  accent3: '#ffdfe6', // light pink
  text: '#0f172a',
  glass: 'rgba(255,255,255,0.7)',
  border: '#e6eef5',
};

export const styles = StyleSheet.create({
  // App container
  app: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: 24,
  },

  // NAV
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    marginBottom: 18,
  },
  brand: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: colors.accent1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 3,
  },
  logoText: {
    fontWeight: '700',
    color: colors.text,
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  navActions: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  navLink: {
    color: colors.text,
    fontWeight: '600',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  navLinkHover: {
    backgroundColor: colors.glass,
    borderRadius: 8,
  },

  // Layout grid (use flexbox in RN)
  mainGrid: {
    flexDirection: 'row',
    gap: 18,
  },
  mainGridColumn: {
    flex: 1,
  },
  mainGridSidebar: {
    width: 360,
  },

  // Cards
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 3,
  },

  // Page header
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  // Buttons
  btn: {
    backgroundColor: colors.accent1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  btnText: {
    fontWeight: '700',
    color: colors.text,
  },
  btnSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  btnSecondaryText: {
    fontWeight: '600',
    color: colors.text,
  },

  // Inputs
  input: {
    width: '100%',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 14,
    marginTop: 8,
    backgroundColor: colors.card,
    color: colors.text,
  },

  // Forms
  formRow: {
    flexDirection: 'row',
    gap: 10,
  },
  formRowInput: {
    flex: 1,
  },

  // Timer
  timerLarge: {
    fontFamily: 'Courier New',
    fontSize: 48,
    textAlign: 'center',
    paddingVertical: 12,
    color: colors.text,
  },

  // Mode tabs
  modeTabs: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  modeTab: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  modeTabText: {
    fontWeight: '600',
    color: colors.text,
  },
  modeTabActive: {
    borderColor: '#e0f2ff',
    backgroundColor: colors.accent2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 3,
  },

  // Todo list
  todoList: {
    padding: 0,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f6f9',
    borderStyle: 'dashed',
  },
  todoMeta: {
    fontSize: 13,
    color: colors.muted,
  },

  // Small text
  small: {
    fontSize: 13,
    color: colors.muted,
  },

  // Mindfulness
  mindSteps: {
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 20,
    color: colors.text,
  },

  // Affirmations
  affirm: {
    borderRadius: 10,
    backgroundColor: '#fbfffb',
    padding: 10,
    fontWeight: '600',
    textAlign: 'center',
  },

  // Auth
  authWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60%',
  },
  authCard: {
    width: 360,
    padding: 18,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 3,
    backgroundColor: colors.card,
  },
  authCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: colors.text,
  },
  switchText: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 12,
    textAlign: 'center',
  },
  linkLike: {
    color: '#5580ff',
  },

  // Footer
  footer: {
    marginTop: 18,
    fontSize: 13,
    color: colors.muted,
    textAlign: 'center',
  },
});

export default styles;