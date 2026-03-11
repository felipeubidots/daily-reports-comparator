# Instrucciones para Subir a GitHub

## Paso 1: Crear el repositorio en GitHub (manual)

1. **Abre GitHub en tu navegador:**
   ```
   https://github.com/new
   ```

2. **Completa el formulario:**
   - **Repository name:** `daily-reports-comparator`
   - **Description:** Compare developer daily reports from Slack with their Shortcut task activity
   - **Public:** ☑️ (marcado)
   - **Initialize this repository with:** ☐ Deja TODO desmarcado

3. **Click "Create repository"**

4. Deberías ver una página con instrucciones. Ve al paso 2.

---

## Paso 2: Hacer push del código (automático)

Una vez creado el repositorio, corre este comando:

```bash
cd /tmp/daily-reports-repo
git branch -M main
git push -u origin main
```

---

## ¿Qué hago si sale error?

### Error: "Repository not found"
- ✅ Ve a https://github.com/new y crea el repositorio primero
- Asegúrate de usar el nombre exacto: `daily-reports-comparator`

### Error: "fatal: remote origin already exists"
- ✅ El remote ya está configurado (esto es normal)
- Solo corre: `git push -u origin main`

### Error: "Permission denied"
- ✅ Necesitas autenticar con GitHub
- En Windows, usa Git Credential Manager (debería salir un popup)
- O [genera un Personal Access Token](https://github.com/settings/tokens)

---

## Comando rápido (una sola línea)

Si todo está listo, simplemente:

```bash
cd /tmp/daily-reports-repo && git push -u origin main
```

---

## Verificar que funcionó

Después de hacer push, abre:
```
https://github.com/felipeubidots/daily-reports-comparator
```

Deberías ver:
- ✅ README.md visible
- ✅ Archivos: index.js, package.json, LICENSE, etc.
- ✅ "2 commits" en la rama main
- ✅ .env NO visible (protegido por .gitignore)
